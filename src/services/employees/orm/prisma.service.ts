import { ORMInterface } from '../../../interfaces/orm.interface';
import { PrismaClient } from '@prisma/client';
import { error, log } from 'console';
import { injectable, inject } from 'inversify';
import { emit } from 'process';
import { ErrorWithStatus } from '../../../interfaces/ErrorWithStatus.interface';
import 'reflect-metadata';
import {
    HashPasswordInterface,
    ValidateEmailInterface,
    ValidatePasswordInterface,
    ValidatePhoneInterface,
} from '../../../interfaces/employee.interface';
import {
    HASHPASSWORD,
    VALIDATEEMAIL,
    VALIDATEPASSWORD,
    VALIDATEPHONE,
} from '../../../config/types/employee.type';
const prisma = new PrismaClient();
const validateSchema = require('../../../Schema/EmployeeSchema');

@injectable()
export class PrismaService implements ORMInterface {
    private hashPassWord: HashPasswordInterface;
    private validateEmail: ValidateEmailInterface;
    private validatePassword: ValidatePasswordInterface;
    private validatePhone: ValidatePhoneInterface;
    constructor(
        @inject(HASHPASSWORD) hashPassword: HashPasswordInterface,
        @inject(VALIDATEEMAIL) validateEmail: ValidateEmailInterface,
        @inject(VALIDATEPASSWORD) validatePassword: ValidatePasswordInterface,
        @inject(VALIDATEPHONE) validatePhone: ValidatePhoneInterface,
    ) {
        this.hashPassWord = hashPassword;
        this.validateEmail = validateEmail;
        this.validatePassword = validatePassword;
        this.validatePhone = validatePhone;
    }
    async connect() {
        // Không cần kết nối riêng vì Prisma đã tự động kết nối
    }
    async addData(data: any): Promise<void> {
        if (validateSchema(data) == false) {
            console.log(validateSchema.errors);

            throw new Error(validateSchema.errors[0].message);
        }
        data.date_of_birth = new Date(data.date_of_birth);
        data.start_date = new Date(data.start_date);
        data.salary = Number(data.salary);
        const emailUnique = await prisma.employee.findMany({
            where: {
                email: data.email,
            },
        });
        if (emailUnique.length != 0) {
            console.log('duplicate');
            throw new Error('Duplicate email');
            // return error;
        }
        if (this.validateEmail.validate(data.email) == false) {
            throw new Error('Invalid email');
        }

        console.log('Valid email');
        // data.password = generatePassword.generate();
        if (this.validatePassword.validate(data.password) == false) {
            throw new Error('Invalid password');
        }
        const password = await this.hashPassWord.hash(data.password);
        data.password = password;
        if (this.validatePhone.validate(data.phone_number) == false) {
            throw new Error('Invalid phone number');
        }
        await prisma.employee.create({
            data: data,
        });
        const respond: any = data;
        console.log('done add data');

        return respond;
    }

    async readData(
        filter: any,
        page: any,
        perPage: any,
        skip: any,
    ): Promise<void> {
        // $month: new Date('YYYY-07-01T00:00:00Z')
        const monthBirth = filter.monthBirth;
        const gender = filter.gender;
        page = page?.toString();
        perPage = perPage?.toString();
        skip = skip?.toString();
        const pageQuery = `LIMIT ${perPage} OFFSET ${skip}`;
        const totalCountQuery = `SELECT COUNT(*) AS total FROM "Employee"`;
        try {
            let employeeQuerry = 'SELECT * FROM "Employee"';
            if (monthBirth != null || gender != null) {
                employeeQuerry += ' WHERE ';
            }
            if (monthBirth != null) {
                employeeQuerry +=
                    'EXTRACT(MONTH FROM date_of_birth) = ' + monthBirth;
            }
            if (monthBirth != null && gender != null) {
                employeeQuerry += ' AND ';
            }
            if (gender != null) {
                employeeQuerry += "gender = '" + gender + "'";
            }
            employeeQuerry += pageQuery;
            // console.log(employeeQuerry);

            const data: any = await prisma.$queryRawUnsafe(employeeQuerry);
            const totalCount: any =
                await prisma.$queryRawUnsafe(totalCountQuery);
            console.log('Done read data');
            console.log(totalCount);

            const result: any = {
                data: data,
                page: page,
                perPage: perPage,
                totalCount: totalCount[0].toString(),
            };
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }
    async deleteData(id: number): Promise<void> {
        const deleteUser = await prisma.employee.delete({
            where: {
                id: Number(id),
            },
        });
    }
    async updateData(id: number, data: any): Promise<void> {
        var schema = {
            full_name: data.full_name,
            date_of_birth: data.date_of_birth || '',
            gender: data.gender || '',
            address: data.address || '',
            phone_number: data.phone_number || '',
            email: data.email || '',
            job_title: data.job_title || '',
            start_date: data.start_date || '',
            salary: data.salary || '',
            profile_picture: data.profile_picture || '',
            password: data.password || '',
        };
        Object.assign(schema, data);
        if (validateSchema(schema) == false) {
            throw new Error(validateSchema.errors[0].message);
        }
        data.salary = Number(data.salary);
        id = Number(id);
        if (data.email != null) {
            const emailUnique = await prisma.employee.findMany({
                where: {
                    email: data.email,
                },
            });
            if (emailUnique.length != 0) {
                console.log('duplicate');
                throw new Error('Duplicate email');
                // return error;
            }
            if (this.validateEmail.validate(data.email) == false) {
                throw new Error('Invalid email');
            }
        }
        if (data.password != null) {
            if (this.validatePassword.validate(data.password) == false) {
                throw new Error('Invalid password');
            }
        }
        if (data.phone_number != null) {
            if (this.validatePhone.validate(data.phone_number) == false) {
                throw new Error('Invalid phone number');
            }
        }
        const updateUser = await prisma.employee.update({
            where: {
                id: Number(id),
            },
            data: data,
        });
    }
    async login(email: string, password: string): Promise<void> {
        try {
            const result: any = await prisma.employee.findFirstOrThrow({
                where: {
                    email: email,
                },
            });
            const match: any = await this.hashPassWord.compare(
                password,
                result.password,
            );
            if (match) {
                return result;
            } else {
                throw new Error('Login failed');
            }
        } catch (error: any) {
            throw new Error(error);
        }
    }

    // Triển khai các phương thức tương tự cho thêm, xóa, sửa dữ liệu
}

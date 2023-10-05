import { ORMInterface } from '../../../interfaces/orm.interface';
import { PrismaClient } from '@prisma/client';
import { error, log } from 'console';
import { injectable, inject } from 'inversify';
import { emit } from 'process';
import { ErrorWithStatus } from '../../../interfaces/ErrorWithStatus.interface';
import 'reflect-metadata';
import { HttpStatusCode } from '../../../utils/ErrorStatusCode';
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
import BaseError from '../../../utils/BaseError';
const prisma = new PrismaClient();
const { schema, validate } = require('../../../Schema/EmployeeSchema');
const jwt = require('jsonwebtoken');

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
        if (validate(data) == false) {
            const schemaProperties = Object.keys(schema.properties);
            const userProperties = Object.keys(data);
            const missingColumns = schemaProperties.filter(
                (column) => !userProperties.includes(column),
            );
            const extraColumns = userProperties.filter(
                (column) => !schemaProperties.includes(column),
            );
            if (missingColumns.length != 0) {
                throw new BaseError(
                    HttpStatusCode.UNPROCESSABLE_ENTITY,
                    'fail',
                    'Must have required properties: ' + missingColumns,
                );
            }
            if (extraColumns.length != 0) {
                throw new BaseError(
                    HttpStatusCode.UNPROCESSABLE_ENTITY,
                    'fail',
                    'Must not have properties: ' + extraColumns,
                );
            }
            throw new BaseError(
                HttpStatusCode.UNPROCESSABLE_ENTITY,
                'fail',
                validate.errors[0].message,
            );
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
            // throw new Error('Duplicate email');
            throw new BaseError(
                HttpStatusCode.CONFLICT,
                'fail',
                'Duplicate email',
            );
            // return error;
        }
        if (this.validateEmail.validate(data.email) == false) {
            // throw new Error('Invalid email');
            throw new BaseError(
                HttpStatusCode.BAD_REQUEST,
                'fail',
                'Invalid email',
            );
        }

        console.log('Valid email');
        // data.password = generatePassword.generate();
        if (this.validatePassword.validate(data.password) == false) {
            // throw new Error('Invalid password');
            throw new BaseError(
                HttpStatusCode.BAD_REQUEST,
                'fail',
                'Invalid password',
            );
        }
        const password = await this.hashPassWord.hash(data.password);
        data.password = password;
        if (this.validatePhone.validate(data.phone_number) == false) {
            // throw new Error('Invalid phone number');
            throw new BaseError(
                HttpStatusCode.BAD_REQUEST,
                'fail',
                'Invalid phone number',
            );
        }
        var getId = await prisma.employee.create({
            data: data,
        });

        data.id = getId.id;
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
            console.log(totalCount[0].total);

            const result: any = {
                data: data,
                page: page,
                perPage: perPage,
                totalCount: totalCount[0].total.toString(),
                from: 'prisma',
            };
            return result;
        } catch (error: any) {
            console.error(error);
            throw new BaseError(
                HttpStatusCode.BAD_REQUEST,
                'fail',
                error.message,
            );
        } finally {
            await prisma.$disconnect();
        }
    }
    async deleteData(id: number): Promise<void> {
        try {
            await prisma.employee.findFirstOrThrow({
                where: {
                    id: Number(id),
                },
            });
            const deleteUser: any = await prisma.employee.delete({
                where: {
                    id: Number(id),
                },
            });
            return deleteUser;
        } catch (error: any) {
            throw new BaseError(
                HttpStatusCode.INTERNAL_SERVER,
                'fail',
                error.message,
            );
        }
    }
    async updateData(id: number, data: any): Promise<void> {
        var updateSchema = {
            full_name: data.full_name || '',
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
        Object.assign(updateSchema, data);
        if (validate(updateSchema) == false) {
            const schemaProperties = Object.keys(schema.properties);
            const userProperties = Object.keys(updateSchema);
            const missingColumns = schemaProperties.filter(
                (column) => !userProperties.includes(column),
            );
            const extraColumns = userProperties.filter(
                (column) => !schemaProperties.includes(column),
            );
            if (missingColumns.length != 0) {
                throw new BaseError(
                    HttpStatusCode.UNPROCESSABLE_ENTITY,
                    'fail',
                    'Must have required properties: ' + missingColumns,
                );
            }
            if (extraColumns.length != 0) {
                throw new BaseError(
                    HttpStatusCode.UNPROCESSABLE_ENTITY,
                    'fail',
                    'Must not have properties: ' + extraColumns,
                );
            }
            throw new BaseError(
                HttpStatusCode.UNPROCESSABLE_ENTITY,
                'fail',
                validate.errors[0].message,
            );
        }
        if (data.salary != null) {
            data.salary = Number(data.salary);
        }
        id = Number(id);
        if (data.email != null) {
            const emailUnique = await prisma.employee.findMany({
                where: {
                    email: data.email,
                },
            });
            if (emailUnique.length != 0) {
                console.log('duplicate');
                throw new BaseError(
                    HttpStatusCode.CONFLICT,
                    'fail',
                    'Duplicate email',
                );
                // return error;
            }
            if (this.validateEmail.validate(data.email) == false) {
                throw new BaseError(
                    HttpStatusCode.BAD_REQUEST,
                    'fail',
                    'Invalid email',
                );
            }
        }
        if (data.password != null) {
            if (this.validatePassword.validate(data.password) == false) {
                throw new BaseError(
                    HttpStatusCode.BAD_REQUEST,
                    'fail',
                    'Invalid password',
                );
            }
        }
        if (data.phone_number != null) {
            if (this.validatePhone.validate(data.phone_number) == false) {
                throw new BaseError(
                    HttpStatusCode.BAD_REQUEST,
                    'fail',
                    'Invalid phone number',
                );
            }
        }
        try {
            const updateUser = await prisma.employee.update({
                where: {
                    id: Number(id),
                },
                data: data,
            });
        } catch (error: any) {
            throw new BaseError(
                HttpStatusCode.INTERNAL_SERVER,
                'fail',
                error.message,
            );
        }
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
                const token = jwt.sign(
                    { email: email, password: password },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRES_IN },
                );
                console.log(token);
                return token;
            } else {
                throw new BaseError(
                    HttpStatusCode.UNAUTHORIZED,
                    'fail',
                    'Login failed',
                );
            }
        } catch (error: any) {
            throw new BaseError(
                HttpStatusCode.INTERNAL_SERVER,
                'fail',
                error.message,
            );
        }
    }
    async countRecord(): Promise<number> {
        var count = 0;
        const totalCountQuery = `SELECT COUNT(*) AS total FROM "Employee"`;
        const totalRecord: any = await prisma.$queryRawUnsafe(totalCountQuery);
        count = totalRecord[0].total;
        return count;
    }

    // Triển khai các phương thức tương tự cho thêm, xóa, sửa dữ liệu
}

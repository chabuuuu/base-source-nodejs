import { ORMInterface } from './orm.interface';
import { PrismaClient } from '@prisma/client';
import { error, log } from 'console';
import { injectable, inject } from 'inversify';
import { emit } from 'process';
import { GeneratePassword } from '../utils/generatePassword';
import { ValidateEmail } from '../utils/validateEmail';
import { ValidatePassword } from '../utils/validatePassword';
import { ValidatePhone } from '../utils/validatePhone';
import { HashPassword } from '../utils/hashPassword';
import { ErrorWithStatus } from '../interfaces/ErrorWithStatus.interface';
import 'reflect-metadata';
const prisma = new PrismaClient();
const validateSchema = require('../Schema/EmployeeSchema');
const generatePassword = new GeneratePassword();
const validateEmail = new ValidateEmail();
const validatePassword = new ValidatePassword();
const validatePhone = new ValidatePhone();
const hashPassword = new HashPassword();
@injectable()
export class PrismaService implements ORMInterface {
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
        if (validateEmail.validate(data.email) == false) {
            throw new Error('Invalid email');
        }

        console.log('Valid email');
        // data.password = generatePassword.generate();
        if (validatePassword.validate(data.password) == false) {
            throw new Error('Invalid password');
        }
        const password = await hashPassword.hash(data.password);
        data.password = password;
        if (validatePhone.validate(data.phone_number) == false) {
            throw new Error('Invalid phone number');
        }
        await prisma.employee.create({
            data: data,
        });
        const respond: any = data;
        console.log('done add data');

        return respond;
    }

    async readData(filter: any): Promise<void> {
        // $month: new Date('YYYY-07-01T00:00:00Z')
        const monthBirth = filter.monthBirth;
        const gender = filter.gender;

        var allPhoto: any;
        try {
            // allPhoto = await prisma.employee.findMany({
            // });
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
            // console.log(employeeQuerry);

            const respondData: any =
                await prisma.$queryRawUnsafe(employeeQuerry);
            console.log('Done read data');
            return respondData;
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
        data.salary = Number(data.salary);
        id = Number(id);
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
        if (validateEmail.validate(data.email) == false) {
            throw new Error('Invalid email');
        }
        if (validatePassword.validate(data.password) == false) {
            throw new Error('Invalid password');
        }
        if (validatePhone.validate(data.phone_number) == false) {
            throw new Error('Invalid phone number');
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
            const match: any = await hashPassword.compare(
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

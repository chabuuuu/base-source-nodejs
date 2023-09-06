import { ORMInterface } from './orm.interface';
import { PrismaClient } from '@prisma/client';
import { log } from 'console';
import { injectable, inject } from 'inversify';
import { emit } from 'process';
import { GeneratePassword } from '../utils/generatePassword';
import * as EmailValidator from 'email-validator';
import 'reflect-metadata';
const prisma = new PrismaClient();
const generatePassword = new GeneratePassword();
@injectable()
export class PrismaService implements ORMInterface {
    async connect() {
        // Không cần kết nối riêng vì Prisma đã tự động kết nối
    }
    async addData(data: any): Promise<void> {
        data.date_of_birth = new Date(data.date_of_birth);
        data.start_date = new Date(data.start_date);
        data.salary = Number(data.salary);

        const emailUnique = await prisma.employee.findMany({
            where: {
                email: data.email,
            },
        });
        if (emailUnique.length != 0) {
            const error: any = 'Duplicate email';
            console.log('duplicate');
            return error;
        }
        if (EmailValidator.validate(data.email) == false) {
            const erorr: any = 'Invalid email';
            console.log('Invalid email');
            return erorr;
        }
        data.password = generatePassword.generate();
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
        const updateUser = await prisma.employee.update({
            where: {
                id: Number(id),
            },
            data: data,
        });
    }
    async findData(id: number): Promise<void> {
        const result: any = await prisma.employee.findUnique({
            where: {
                id: Number(id),
            },
        });
        return result;
    }

    // Triển khai các phương thức tương tự cho thêm, xóa, sửa dữ liệu
}

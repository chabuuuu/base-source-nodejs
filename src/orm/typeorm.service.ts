import { ORMInterface } from './orm.interface';
import { Employee } from '../entities/Employee';
import { AppDataSource } from '../data-source/index';
import { injectable, inject } from 'inversify';
import * as EmailValidator from 'email-validator';
import { GeneratePassword } from '../utils/generatePassword';
import 'reflect-metadata';
const db = require('../data-source/index');
const generatePassword = new GeneratePassword();

@injectable()
export class TypeORMService implements ORMInterface {
    async connect() {
        // Kết nối với TypeORM
        db.connect();
    }
    async addData(data: any): Promise<void> {
        console.log('DANG ADD DATA');
        const emailUnique = await AppDataSource.manager.find(Employee, {
            where: {
                email: data.email,
            },
        });
        if (emailUnique.length != 0) {
            const error: any = 'Duplicate email';
            console.log('Duplicate email');
            return error;
        }
        if (EmailValidator.validate(data.email) == false) {
            const error: any = 'Invalid email';
            console.log('Invalid email');
            return error;
        }
        data.password = generatePassword.generate();
        await AppDataSource.manager.save(Employee, data);
        console.log('Employee has been saved by typeorm');
        const respond: any = data;
        return respond;
    }
    async readData(filter: any): Promise<void> {
        // const data = await AppDataSource.manager.find(Employee, {});
        // const result: any = data;
        // return result;
        const monthBirth = filter.monthBirth;
        const gender = filter.gender;

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

        const data = await AppDataSource.manager.query(employeeQuerry);
        return data;
    }
    async deleteData(id: number): Promise<void> {
        await AppDataSource.manager.delete(Employee, { id: id });
    }
    async updateData(id: number, data: any): Promise<void> {
        await AppDataSource.manager.update(Employee, { id: id }, data);
    }
    async findData(id: number): Promise<void> {
        const result: any = await AppDataSource.manager.find(Employee, {
            where: {
                id: id,
            },
        });
        return result[0];
    }

    // Triển khai các phương thức tương tự cho thêm, xóa, sửa dữ liệu
}

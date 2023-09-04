import { ORMInterface } from './orm.interface';
import { Employee } from '../entities/Photo';
import { AppDataSource } from '../data-source/index';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
const db = require('../data-source/index');

@injectable()
export class TypeORMService implements ORMInterface {
    async connect() {
        // Kết nối với TypeORM
        db.connect();
    }
    async addData(data: any): Promise<void> {
        console.log('DANG ADD DATA');
        await AppDataSource.manager.save(Employee, data);
        console.log('Employee has been saved by typeorm');
    }
    async readData(): Promise<void> {
        const data = await AppDataSource.manager.find(Employee, {});
        const result: any = data;
        return result;
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

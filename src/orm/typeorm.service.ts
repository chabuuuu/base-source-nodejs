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
    async addData(req: any, res: any, next: any): Promise<void> {
        console.log('DANG ADD DATA');

        const employee = new Employee();
        employee.full_name = 'typeorm name';
        employee.date_of_birth = new Date(2004 - 10 - 19);
        employee.gender = 'Nu';
        employee.address = '111 Le Dai Hanh';
        employee.phone_number = '09123123';
        employee.email = '123@gmail.com';
        employee.job_title = 'UI UX Design';
        employee.start_date = new Date('2023-1-08');
        employee.salary = 10000000;
        employee.profile_picture =
            'https://taihinhanh.vn/wp-content/uploads/2021/07/Hinh-anh-meo-ngau-Taihinhanh-Vn-19.jpg';
        await AppDataSource.manager.save(employee);
        console.log(
            'Photo has been saved by type ORM. Photo id is',
            employee.id,
        );
    }
    async readData(): Promise<void> {
        const data = await AppDataSource.manager.find(Employee, {});
        const result: any = data;
        return result;
    }

    // Triển khai các phương thức tương tự cho thêm, xóa, sửa dữ liệu
}

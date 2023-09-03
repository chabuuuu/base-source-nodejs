import { ORMInterface } from './orm.interface';
import { Photo } from '../entities/Photo';
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

        const photo = new Photo();
        photo.name = 'Me and Bears sadasd';
        photo.description = 'I am near polar bears';
        photo.filename = 'photo-with-bears.jpg';
        photo.views = 1;
        photo.isPublished = true;

        await AppDataSource.manager.save(photo);
        console.log('Photo has been saved by type ORM. Photo id is', photo.id);
    }
    async readData(): Promise<void> {}

    // Triển khai các phương thức tương tự cho thêm, xóa, sửa dữ liệu
}

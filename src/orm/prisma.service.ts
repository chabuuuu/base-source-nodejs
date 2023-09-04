import { ORMInterface } from './orm.interface';
import { PrismaClient } from '@prisma/client';
import { log } from 'console';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
const prisma = new PrismaClient();
@injectable()
export class PrismaService implements ORMInterface {
    async connect() {
        // Không cần kết nối riêng vì Prisma đã tự động kết nối
    }
    async addData(req: any, res: any, next: any): Promise<void> {
        console.log('Adding data...');

        async function main() {
            await prisma.photo.create({
                data: {
                    name: 'prisma',
                    description: 'test',
                    filename: 'nothing',
                    views: 25,
                    isPublished: true,
                },
            });
            console.log('Add data done by prisma');
        }

        main()
            .then(async () => {
                await prisma.$disconnect();
            })
            .catch(async (e) => {
                console.error(e);
                await prisma.$disconnect();
                process.exit(1);
            });
    }
    async readData(): Promise<void> {
        var allPhoto: any;
        try {
            allPhoto = await prisma.photo.findMany();
            console.log('Done read all data');
            return allPhoto;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    // Triển khai các phương thức tương tự cho thêm, xóa, sửa dữ liệu
}
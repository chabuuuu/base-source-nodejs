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
        console.log('connect asdasd');
    }
    async addData(req: any, res: any, next: any): Promise<void> {
        console.log('add data...');

        async function main() {
            // ... you will write your Prisma Client queries here
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
    async readData(req: any, res: any, next: any): Promise<void> {
        var allPhoto: any;
        async function main() {
            allPhoto = await prisma.photo.findMany();
            res.send(allPhoto);
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

    // Triển khai các phương thức tương tự cho thêm, xóa, sửa dữ liệu
}

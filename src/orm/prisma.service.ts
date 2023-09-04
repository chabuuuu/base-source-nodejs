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
            await prisma.employee.create({
                data: {
                    full_name: 'prisma',
                    date_of_birth: new Date('2004-03-03'),
                    gender: 'Nu',
                    address: '130 Binh Thoi',
                    phone_number: '0909128321',
                    email: 'ahsdhdas',
                    job_title: 'IT',
                    start_date: new Date('2023-07-08'),
                    salary: 120000,
                    profile_picture:
                        'https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_9.jpg',
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
            allPhoto = await prisma.employee.findMany();
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

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
    async addData(data: any): Promise<void> {
        console.log('Adding data...');
        data.date_of_birth = new Date(data.date_of_birth);
        data.start_date = new Date(data.start_date);
        data.salary = Number(data.salary);
        async function main() {
            await prisma.employee.create({
                data: data,
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

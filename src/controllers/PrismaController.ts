import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../orm/prisma.service';
import employeeService from '../config/orm-config';
const prismaService = new PrismaService();
const prisma = new PrismaClient();
export class PrismaController {
    addData(req: any, res: any, next: any) {
        employeeService.addData;
        res.send('Done!');
    }
    readAllData(req: any, res: any, next: any) {
        prismaService.readData;
        res.send('Done read data!');
    }
}

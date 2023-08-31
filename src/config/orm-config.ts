import 'reflect-metadata';
import 'dotenv/config';
import { EmployeeService } from '../services/employees/employee.service';
import ormModule from '../orm/orm.module';
import { Container } from 'inversify';
import { ORM, ORMInterface } from '../orm/orm.interface';
import { TypeORMService } from '../orm/typeorm.service';
import { PrismaService } from '../orm/prisma.service';
import container from '../orm/orm.module';
import { log } from 'console';
const prisma = new PrismaService();
const db = require('../data-source/index');

// const selectedORM = process.env.SELECTED_ORM || 'typeorm';
// const globalContainer = new Container();
// // globalContainer.load(ormModule);
// globalContainer.load()
// // Lựa chọn ORM dựa trên giá trị selectedORM
// let ormService: ORMInterface;
// if (selectedORM === 'typeorm') {
// ormService = globalContainer.get('TypeORMService');
// db.connect();
// } else if (selectedORM === 'prisma') {
// // import PrismaService if needed and get it from the container
// ormService = globalContainer.get('PrismaService');
// } else {
// throw new Error('Invalid ORM selected');
// }

// const employeeService = new EmployeeService(ormService);

const globalContainer = new Container();
globalContainer.load(ormModule);

const ormService = globalContainer.get<ORMInterface>('ORMInterface');
// console.log(ormService);
// try {
//      ormService.connect;
//      prisma.connect;
// } catch (error) {

// }
// log('done');
const employeeService = new EmployeeService(ormService);
//WORKING!!!
// employeeService.connectORM();
// employeeService.readAllData();

//     // var orm = container.get<ORM>("ORM");
// export default orm;

export default employeeService;

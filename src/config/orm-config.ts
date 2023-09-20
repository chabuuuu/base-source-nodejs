import 'reflect-metadata';
import 'dotenv/config';
import { EmployeeService } from '../services/employees/employee.service';
import ormModule from '../config/employee.config';
import { Container } from 'inversify';
import { ORMInterface } from '../interfaces/orm.interface';
const globalContainer = new Container();

globalContainer.load(ormModule);

const ormService = globalContainer.get<ORMInterface>('ORMInterface');

const employeeService = new EmployeeService(ormService);
export default employeeService;

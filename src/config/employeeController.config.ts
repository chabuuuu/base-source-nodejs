import { Container } from 'inversify';
import 'reflect-metadata';
import { ConverStringToObject } from '../services/employees/ConvertStringToObject.service';
import { CONVERTSTRINGTOOBJECT } from './types/employee.type';
const container = new Container();

container.bind(CONVERTSTRINGTOOBJECT).to(ConverStringToObject);

export default container;

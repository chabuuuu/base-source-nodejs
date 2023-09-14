import { Container, ContainerModule, interfaces } from 'inversify';
import { TypeORMService } from '../services/employees/orm/typeorm.service';
import { PrismaService } from '../services/employees/orm/prisma.service';
import { ORMInterface } from '../interfaces/orm.interface';
import {
    HASHPASSWORD,
    VALIDATEEMAIL,
    VALIDATEPASSWORD,
    VALIDATEPHONE,
} from './types/employee.type';
import { HashPassword } from '../services/employees/HashPassword.service';
import { ValidateEmail } from '../services/employees/ValidateEmail.service';
import { ValidatePassword } from '../services/employees/ValidatePassword.service';
import { ValidatePhone } from '../services/employees/ValidatePhone.service';
const db = require('../data-source/index');

async function connect() {
    await db.connect();
}

const ormModule = new ContainerModule(
    (bind: interfaces.Bind, unbind: interfaces.Unbind) => {
        const selectedORM = process.env.SELECTED_ORM || 'typeorm';
        bind(HASHPASSWORD).to(HashPassword);
        bind(VALIDATEEMAIL).to(ValidateEmail);
        bind(VALIDATEPASSWORD).to(ValidatePassword);
        bind(VALIDATEPHONE).to(ValidatePhone);

        if (selectedORM === 'typeorm') {
            bind<ORMInterface>('ORMInterface')
                .to(TypeORMService)
                .inSingletonScope();
            console.log('Bind to typeorm');
            try {
                connect();
                console.log('Ket noi thanh cong!');
            } catch (error) {
                console.log('Loi ket noi');
            }
        } else if (selectedORM === 'prisma') {
            console.log('bind to prisma');

            bind<ORMInterface>('ORMInterface')
                .to(PrismaService)
                .inSingletonScope();
        } else {
            throw new Error('Invalid ORM selected');
        }
    },
);

export default ormModule;

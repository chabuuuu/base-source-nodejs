import { ContainerModule, interfaces } from 'inversify';
import { TypeORMService } from './typeorm.service';
import { PrismaService } from './prisma.service';
import { ORMInterface } from './orm.interface';
const db = require('../data-source/index');

async function connect() {
    await db.connect();
}

const ormModule = new ContainerModule(
    (bind: interfaces.Bind, unbind: interfaces.Unbind) => {
        const selectedORM = process.env.SELECTED_ORM || 'typeorm';

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

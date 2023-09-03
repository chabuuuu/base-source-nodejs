// import { TypeORMService } from './typeorm.service';
// import { PrismaService } from './prisma.service';
// import { ORM, ORMInterface } from './orm.interface';
// import { ContainerModule, interfaces } from 'inversify';
// import { Container } from "inversify";
// import { OrmConfig } from './orm.service';
// import 'reflect-metadata'

// // const ormModule = new ContainerModule((bind: interfaces.Bind) => {
// //     bind<ORMInterface>('ORMInterface').to(TypeORMService).inSingletonScope();
// //     bind<ORMInterface>('ORMInterface').to(PrismaService).inSingletonScope();
// //   });

// var container = new Container();
// container.bind<ORMInterface>("ORMInterface").to(PrismaService).inSingletonScope();
// // container.bind<ORMInterface>("ORMInterface").to(PrismaService);
// container.bind<ORMInterface>("ORMInterface").to(TypeORMService).inSingletonScope();

// // container.bind<Weapon>("Weapon").to(Katana);

// // container.bind<ORMInterface>("ORMInterface").to(TypeORMService);

// export default container;
// // export default ormModule;

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

            // unbind<ORMInterface>(PrismaService); // Unbind Prisma if TypeORM is selected
        } else if (selectedORM === 'prisma') {
            console.log('bind to prisma');

            bind<ORMInterface>('ORMInterface')
                .to(PrismaService)
                .inSingletonScope();
            //   unbind<ORMInterface>(TypeORMService); // Unbind TypeORM if Prisma is selected
        } else {
            throw new Error('Invalid ORM selected');
        }
    },
);

export default ormModule;

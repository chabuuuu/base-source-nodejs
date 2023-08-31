import { TypeOrmController } from '../controllers/TypeOrmController';
import { PrismaController } from '../controllers/PrismaController';
const prismaController = new PrismaController();
const typeOrmController = new TypeOrmController();
function route(app: any) {
    app.use('/typeorm', typeOrmController.getHome);
    app.use('/prisma/read-all-data', prismaController.readAllData);
    app.use('/prisma/add-data', prismaController.addData);
}
module.exports = route;

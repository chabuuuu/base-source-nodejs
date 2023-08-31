const typeCotroller = require('../controllers/TypeOrmController');
const prismaController = require('../controllers/PrismaController');
function route(app: any) {
    app.use('/typeorm', typeCotroller.getHome);
    app.use('/prisma', prismaController.getHome);
}
module.exports = route;

import { OrmController } from '../controllers/OrmController';
const ormController = new OrmController();
function route(app: any) {
    app.use('/read-data', ormController.readAllData);
    app.use('/add-data', ormController.addData);
}
module.exports = route;

import { OrmController } from '../controllers/OrmController';
const ormController = new OrmController();
function route(app: any) {
    app.use('/read-data', ormController.readAllData);
    app.use('/add-data', ormController.addData);
    app.use('/delete-data', ormController.deleteData);
    app.use('/update-data', ormController.updateData);
}
module.exports = route;

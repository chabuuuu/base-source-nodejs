import { OrmController } from '../controllers/OrmController';
const ormController = new OrmController();
function route(app: any) {
    app.use('/add-data', ormController.addData);
    app.use('/delete-data', ormController.deleteData);
    app.use('/update-data/:id', ormController.updateData);
    app.get('/edit/:id', ormController.edit);
    app.use('/', ormController.readAllData);
}
module.exports = route;

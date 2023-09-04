import { OrmController } from '../controllers/OrmController';
const ormController = new OrmController();
function route(app: any) {
    app.post('/add-data', ormController.addData);
    app.get('/add-data-view', ormController.addDataView);
    app.delete('/delete-data/:id', ormController.deleteData);
    app.put('/update-data/:id', ormController.updateData);
    app.get('/edit/:id', ormController.edit);
    app.get('/', ormController.readAllData);
}
module.exports = route;

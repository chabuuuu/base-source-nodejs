import { OrmController } from '../controllers/OrmController';
import { UploadController } from '../controllers/UploadController';
// const multer  = require('multer');
import multer from 'multer';
const ormController = new OrmController();
const uploadController = new UploadController();
const path = require('path');
const employeeRouter = require('./employee');
const mediaRouter = require('./media');
const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, 'storage/data');
    },
    filename: (req: any, file: any, cb: any) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });
function route(app: any) {
    app.use('/api/v1/employees', employeeRouter);
    app.use('/api/v1/media', mediaRouter);
    app.get('/add-data-view', ormController.addDataView);
    app.get('/edit/:id', ormController.edit);
    app.get('/upload-image-view', uploadController.addImageView);
    app.get('/', ormController.readAllData);
}
module.exports = route;

import { OrmController } from '../controllers/OrmController';
import { UploadController } from '../controllers/UploadController';
// const multer  = require('multer');
import multer from 'multer';
const ormController = new OrmController();
const uploadController = new UploadController();
const path = require('path');
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
    app.post('/add-data', ormController.addData);
    app.get('/add-data-view', ormController.addDataView);
    app.delete('/delete-data/:id', ormController.deleteData);
    app.put('/update-data/:id', ormController.updateData);
    app.get('/edit/:id', ormController.edit);
    app.get('/upload-image-view', uploadController.addImageView);
    app.post(
        '/upload-image',
        upload.single('image_video'),
        uploadController.addImage,
    );
    app.get('/', ormController.readAllData);
}
module.exports = route;

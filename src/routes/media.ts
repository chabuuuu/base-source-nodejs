const express = require('express');
const router = express.Router();
import { OrmController } from '../controllers/OrmController';
import { UploadController } from '../controllers/UploadController';
const ormController = new OrmController();
import multer from 'multer';
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

router.post('/upload', upload.single('image_video'), uploadController.addImage);

module.exports = router;

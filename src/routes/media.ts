const express = require('express');
const router = express.Router();
import { MediaController } from '../controllers/MediaController';
import multer from 'multer';
const mediaController = new MediaController();
const path = require('path');
const maxSize = 500 * 1024 * 1024;
var fileType = '';
var upload;

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, 'storage/data');
    },
    filename: (req: any, file: any, cb: any) => {
        console.log(file.mimetype);
        fileType = file.mimetype;
        console.log(fileType);

        cb(null, Date.now() + path.extname(file.originalname));
    },
});

if (fileType.includes('video')) {
    upload = multer({
        storage: storage,
        limits: {
            fileSize: maxSize,
        },
    });
} else {
    upload = multer({
        storage: storage,
    });
}

router.post('/upload', upload.single('image_video'), mediaController.addImage);
// router.post('/upload', mediaController.addImage);

module.exports = router;

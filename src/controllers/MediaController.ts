const path = require('path');
import multer from 'multer';
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

export class MediaController {
    async addImage(req: any, res: any, next: any) {
        console.log(res.locals.admin);
        console.log(req.file.filename);

        res.send('Done add image/video');
    }
}

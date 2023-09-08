const path = require('path');
import { unlink } from 'node:fs/promises';
const sharp = require('sharp');
export class MediaController {
    async addImage(req: any, res: any, next: any) {
        // console.log(req.file.filename);
        const filename = req.file.filename;
        console.log(filename);

        try {
            await sharp('storage/data/' + filename)
                .resize({
                    width: 150,
                    height: 97,
                })
                .toFile('storage/data/' + 'resize_' + filename);
            await unlink('storage/data/' + filename);
            console.log('successfully deleted');
        } catch (error) {
            console.log(error);
        }
        res.send('Done add image/video');
    }
}

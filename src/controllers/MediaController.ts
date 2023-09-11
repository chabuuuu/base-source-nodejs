const path = require('path');
import { unlink } from 'node:fs/promises';
const sharp = require('sharp');
// import { exec } from 'child_process';
import { GenerateThumbnail } from '../utils/generateThumbnail';
import { ConvertFilteType } from '../utils/convertFileType';
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const generateThumbnail = new GenerateThumbnail();
const convertFileType = new ConvertFilteType();
export class MediaController {
    async addImage(req: any, res: any, next: any) {
        var fileType = req.file.mimetype.split('/')[1];
        fileType = convertFileType.convert(fileType);
        const videoQuality = 720;
        const aspectRatio = '16:9';
        const filename = req.file.filename.split('.')[0];
        const mediaType = req.file.mimetype.split('/')[0];
        const inputFilePath =
            process.env.ROOT + '/storage/data/' + filename + '.' + fileType;
        const outputFilePath =
            process.env.ROOT + '/storage/data/resize_' + filename + '.mp4';
        const thumbnailNumber = 10;
        var ratio = aspectRatio.split(':');
        const height = videoQuality;
        const width = (height * Number(ratio[0])) / Number(ratio[1]);
        console.log(width + 'x' + height);
        console.log('File type:' + fileType);
        console.log('File name: ' + filename);
        console.log('Media type: ' + mediaType);

        if (mediaType == 'video') {
            console.log('Insert video...');
            console.log('resize video...');
            const command = `ffmpeg -i ${inputFilePath} -vf "scale=${width}:${height}" ${outputFilePath}`;
            try {
                const { stdout, stderr } = await exec(command);
                console.log('stdout:', stdout);
                console.log('stderr:', stderr);
                await unlink('storage/data/' + filename + '.' + fileType);
                console.log('Successfully deleted');
            } catch (error: any) {
                console.log(error);
                throw new Error(error);
            }
            console.log('Generate thumbnail...');
            await generateThumbnail.generate(
                outputFilePath,
                filename,
                thumbnailNumber,
            );
        } else {
            try {
                await sharp('storage/data/' + filename)
                    .resize({
                        width: width,
                        height: height,
                    })
                    .toFile('storage/data/' + 'resize_' + filename);
                await unlink('storage/data/' + filename);
                console.log('successfully deleted');
            } catch (error) {
                console.log(error);
            }
        }

        res.send('Done add image/video');
    }
}

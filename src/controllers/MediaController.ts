const path = require('path');
import { unlink } from 'node:fs/promises';
const sharp = require('sharp');
import { exec } from 'child_process';
import { GenerateThumbnail } from '../utils/generateThumbnail';
const generateThumbnail = new GenerateThumbnail();
// const ffmpegStatic = require('ffmpeg-static');
// const ffmpeg = require('fluent-ffmpeg');
// ffmpeg.setFfmpegPath(ffmpegStatic);
export class MediaController {
    async addImage(req: any, res: any, next: any) {
        // console.log(req.file.filename);
        const filename = req.file.filename;
        const fileType = req.file.mimetype;
        const inputFilePath = process.env.ROOT + '/storage/data/' + filename;
        const outputFilePath =
            process.env.ROOT + '/storage/data/resize_' + filename;
        const thumbnailNumber = 10;
        console.log('video type:' + fileType);
        console.log(filename);
        if (fileType == 'video/mp4') {
            console.log('Generate thumbnail...');
            await generateThumbnail.generate(
                inputFilePath,
                filename,
                thumbnailNumber,
            );

            console.log('resize video...');
            const newWidth = 640; // Độ rộng mới cho video
            const newHeight = 480; // Độ cao mới cho video

            const command = `ffmpeg -i ${inputFilePath} -vf "scale=${newWidth}:${newHeight}" ${outputFilePath}`;

            await exec(command, async (error, stdout, stderr) => {
                if (error) {
                    console.error('Lỗi khi thay đổi kích thước video: ', error);
                } else {
                    console.log('Hoàn thành thay đổi kích thước video.');
                    await unlink('storage/data/' + filename);
                    console.log('successfully deleted');
                }
            });
        } else {
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
        }

        res.send('Done add image/video');
    }
}

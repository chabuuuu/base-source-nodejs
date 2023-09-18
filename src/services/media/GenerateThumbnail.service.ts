// import { exec } from 'child_process';
const { getVideoDurationInSeconds } = require('get-video-duration');
import { injectable } from 'inversify';
import path from 'path';
import { GenerateThumbnailInterface } from '../../interfaces/media.interface';
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
import { FfmpegProgressBar } from './FfmpegProgressBar.service';
import 'reflect-metadata';
@injectable()
export class GenerateThumbnail implements GenerateThumbnailInterface {
    public async generate(
        file: string,
        filename: string,
        numberOfFrames: number,
    ) {
        var videoDuration: any;
        await getVideoDurationInSeconds(file).then((duration: any) => {
            console.log(duration);
            videoDuration = duration;
        });
        var distance = videoDuration / 10;
        console.log('distance' + distance);
        fs.mkdirSync(process.env.ROOT + '/storage/data/thumbnail/' + filename);
        const outputPattern =
            process.env.ROOT +
            '/storage/data/thumbnail/' +
            filename +
            '/%03d.png';
        // console.log(outputPattern);
        // const command = `ffmpeg -i ${file} -q:v 3 -f segment -segment_format mjpeg -segment_wrap ${numberOfFrames} -segment_time ${distance} -vf format=gray ${outputPattern}`;
        const argsCommand = [
            '-i',
            file,
            '-q:v',
            '3',
            '-f',
            'segment',
            '-segment_format',
            'mjpeg',
            '-segment_wrap',
            numberOfFrames.toString(),
            '-segment_time',
            distance.toString(),
            '-vf',
            'format=gray',
            outputPattern,
        ];
        console.log('Generate thumbnail...');
        const ffmpegProgressBar = new FfmpegProgressBar(file);
        try {
            await ffmpegProgressBar.exec(argsCommand);
            console.log('Done generate thumbnail');
        } catch (error) {
            console.error(error);
        }
    }
}

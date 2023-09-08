// import { exec } from 'child_process';
const { getVideoDurationInSeconds } = require('get-video-duration');
import path from 'path';
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
export class GenerateThumbnail {
    async generate(file: string, filename: string, numberOfFrames: number) {
        var videoDuration: any;
        await getVideoDurationInSeconds(file).then((duration: any) => {
            console.log(duration);
            videoDuration = duration;
        });
        var distance = videoDuration / 10;
        console.log('distance' + distance);
        const outputname = filename.split('.');
        fs.mkdirSync(
            process.env.ROOT + '/storage/data/thumbnail/' + outputname[0],
        );
        const outputPattern =
            process.env.ROOT +
            '/storage/data/thumbnail/' +
            outputname[0] +
            '/%03d.png';
        console.log(outputPattern);
        // const command = `ffmpeg -i ${file} -vf select=‘eq(pict_type,I)*lt(n,10)’ -vsync 2 -s 320x240 -f image2 ${outputPattern}`
        // const command =  `ffmpeg -i ${file} -vf "select='eq(pict_type,PICT_TYPE_I)*lt(n,10)',scale=1920:1080" -q:v 2 -vsync vfr ${outputPattern}`;
        const command = `ffmpeg -i ${file} -q:v 3 -f segment -segment_format mjpeg -segment_wrap ${numberOfFrames} -segment_time ${distance} ${outputPattern}`;
        try {
            const { stdout, stderr } = await exec(command);
            console.log('stdout:', stdout);
            console.log('stderr:', stderr);
        } catch (error) {
            console.error(error);
        }
    }
}

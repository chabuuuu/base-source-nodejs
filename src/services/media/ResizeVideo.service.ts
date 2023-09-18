import { injectable } from 'inversify';
import { ResizeVideoInterFace } from '../../interfaces/media.interface';
const util = require('util');
const exec = util.promisify(require('child_process').exec);
import { unlink } from 'node:fs/promises';
import { stdout } from 'node:process';
import { spawnSync } from 'child_process';
import { unlinkSync } from 'fs';
import { spawn } from 'child_process';
import { FfmpegProgressBar } from './FfmpegProgressBar.service';
import BaseError from '../../utils/BaseError';
import { HttpStatusCode } from '../../utils/ErrorStatusCode';

@injectable()
export class ResizeVideo implements ResizeVideoInterFace {
    async resize(
        inputFilePath: string,
        width: number,
        height: number,
        outputFilePath: string,
        fileName: string,
        fileType: string,
    ) {
        const command = [
            '-i',
            inputFilePath,
            '-vf',
            `scale=${width}:${height}`,
            outputFilePath,
        ];
        const ffmpegProgressBar = new FfmpegProgressBar(inputFilePath);
        // Tiến trình đã kết thúc thành công
        try {
            await ffmpegProgressBar.exec(command);
            unlinkSync('storage/data/' + fileName + '.' + fileType);
            console.log('Successfully deleted');
        } catch (error) {
            console.error(error);
            throw new BaseError(
                HttpStatusCode.INTERNAL_SERVER,
                'fail',
                'Cant resize video' + error,
            );
        }
    }
}

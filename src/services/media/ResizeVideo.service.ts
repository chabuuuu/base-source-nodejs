import { injectable } from 'inversify';
import { ResizeVideoInterFace } from '../../interfaces/media.interface';
const util = require('util');
const exec = util.promisify(require('child_process').exec);
import { unlink } from 'node:fs/promises';

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
        const command = `ffmpeg -i ${inputFilePath} -vf "scale=${width}:${height}" ${outputFilePath}`;
        try {
            const { stdout, stderr } = await exec(command);
            console.log('stdout:', stdout);
            console.log('stderr:', stderr);
            await unlink('storage/data/' + fileName + '.' + fileType);
            console.log('Successfully deleted');
        } catch (error: any) {
            console.log(error);
            throw new Error(error);
        }
    }
}

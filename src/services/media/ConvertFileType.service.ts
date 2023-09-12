import { injectable } from 'inversify';
import { ConvertFileTypeInterface } from '../../interfaces/media.interface';
import 'reflect-metadata';
@injectable()
export class ConvertFilteType implements ConvertFileTypeInterface {
    public convert(filetype: string): string {
        console.log('Converting ' + filetype);

        if (filetype == 'x-matroska') {
            return 'mkv';
        }
        if (filetype == 'mp4') {
            return 'mp4';
        }
        throw new Error('Not supported file format');
    }
}

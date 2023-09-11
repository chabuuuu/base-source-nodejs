export class ConvertFilteType {
    convert(filetype: string): string {
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

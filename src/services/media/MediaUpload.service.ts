const path = require('path');
import { unlink } from 'node:fs/promises';
const sharp = require('sharp');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const cliProgress = require('cli-progress');

//Inversify
import { injectable, inject } from 'inversify'; // Import injectable và inject
import 'reflect-metadata';
import {
    GenerateThumbnailInterface,
    ConvertFileTypeInterface,
    MediaUploadInterface,
    ResizeVideoInterFace,
} from '../../interfaces/media.interface';
import {
    GENERATETHUMBNAIL,
    CONVERTFILETYPE,
    RESIZEVIDEO,
} from '../../config/types/media.types';
import BaseError from '../../utils/BaseError';
import { HttpStatusCode } from '../../utils/ErrorStatusCode';

@injectable()
export class MediaUploadService implements MediaUploadInterface {
    //Add invesify
    private generateThumbnail: GenerateThumbnailInterface;
    private convertFileType: ConvertFileTypeInterface;
    private resizeVideo: ResizeVideoInterFace;
    private videoQuality: number;
    private thumbnailNumber: number;
    private aspectRatio: string;
    private fileName: string;
    private mediaType: string;
    private inputFilePath: string;
    private outputFilePath: string;
    private height: number;
    private width: number;
    private fileType: string;

    constructor(
        @inject(GENERATETHUMBNAIL)
        generateThumbnail: GenerateThumbnailInterface,
        @inject(CONVERTFILETYPE) convertFileType: ConvertFileTypeInterface,
        @inject(RESIZEVIDEO) resizeVideo: ResizeVideoInterFace,
    ) {
        this.generateThumbnail = generateThumbnail;
        this.convertFileType = convertFileType;
        this.resizeVideo = resizeVideo;
    }
    public async printInfo() {
        console.log(this.width + 'x' + this.height);
        console.log('File type:' + this.fileType);
        console.log('File name: ' + this.fileName);
        console.log('Media type: ' + this.mediaType);
    }
    public async setInfo(
        req: any,
        videoQuality: number,
        aspectRatio: string,
        thubnailNumber: number,
    ) {
        console.log('File: ' + req.file);
        var fileMimeType = req.file.mimetype.split('/')[1];
        this.fileType = this.convertFileType.convert(fileMimeType);
        this.videoQuality = 720;
        this.aspectRatio = '16:9';
        this.fileName = req.file.filename.split('.')[0];
        this.mediaType = req.file.mimetype.split('/')[0];
        this.inputFilePath =
            process.env.ROOT +
            '/storage/data/' +
            this.fileName +
            '.' +
            this.fileType;
        this.outputFilePath =
            process.env.ROOT + '/storage/data/resize_' + this.fileName + '.mp4';
        this.thumbnailNumber = 10;
        var ratio = this.aspectRatio.split(':');
        this.height = this.videoQuality;
        this.width = (this.height * Number(ratio[0])) / Number(ratio[1]);
    }

    public async upload(req: any, res: any, next: any) {
        if (this.mediaType == 'video') {
            console.log('Insert video...');

            console.log('resize video...');
            try {
                await this.resizeVideo.resize(
                    this.inputFilePath,
                    this.width,
                    this.height,
                    this.outputFilePath,
                    this.fileName,
                    this.fileType,
                );

                console.log('Generate thumbnail...');
                await this.generateThumbnail.generate(
                    this.outputFilePath,
                    this.fileName,
                    this.thumbnailNumber,
                );
            } catch (error: any) {
                next(error);
            }
        } else {
            try {
                await sharp('storage/data/' + this.fileName)
                    .resize({
                        width: this.width,
                        height: this.height,
                    })
                    .toFile('storage/data/' + 'resize_' + this.fileName);
                await unlink('storage/data/' + this.fileName);
                console.log('successfully deleted');
            } catch (error: any) {
                console.log(error);
                next(error);
            }
        }

        res.send('Done add image/video');
    }
}

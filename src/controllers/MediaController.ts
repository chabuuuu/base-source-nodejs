const express = require('express');
import 'reflect-metadata';
import container from '../config/media.config';
import { MediaUploadInterface } from '../interfaces/media.interface';
import { MEDIAUPLOAD } from '../config/types/media.types';
const mediaUploadService = container.get<MediaUploadInterface>(MEDIAUPLOAD);

export class MediaController {
    upload(req: any, res: any, next: any) {
        mediaUploadService.setInfo(req, 720, '16:9', 10);
        mediaUploadService.printInfo();
        mediaUploadService.upload(req, res, next);
    }
}

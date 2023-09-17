const express = require('express');
import 'reflect-metadata';
import container from '../config/media.config';
import { MediaUploadInterface } from '../interfaces/media.interface';
import { MEDIAUPLOAD } from '../config/types/media.types';
import BaseError from '../utils/BaseError';
import { HttpStatusCode } from '../utils/ErrorStatusCode';
const mediaUploadService = container.get<MediaUploadInterface>(MEDIAUPLOAD);

export class MediaController {
    upload(req: any, res: any, next: any) {
        try {
            if (req.file == null) {
                throw new BaseError(
                    HttpStatusCode.BAD_REQUEST,
                    'fail',
                    'File is null',
                );
            }
            mediaUploadService.setInfo(req, 720, '16:9', 10);
            mediaUploadService.printInfo();
            mediaUploadService.upload(req, res, next);
        } catch (error: any) {
            next(error);
        }
    }
}

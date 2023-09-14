import { Container } from 'inversify';
import 'reflect-metadata';
import { GenerateThumbnail } from '../services/media/GenerateThumbnail.service';
import { ConvertFilteType } from '../services/media/ConvertFileType.service';
import { MediaUploadService } from '../services/media/MediaUpload.service';
import {
    GENERATETHUMBNAIL,
    CONVERTFILETYPE,
    MEDIAUPLOAD,
    RESIZEVIDEO,
} from './types/media.types';
import { ResizeVideo } from '../services/media/ResizeVideo.service';
const container = new Container();

container.bind(GENERATETHUMBNAIL).to(GenerateThumbnail);
container.bind(CONVERTFILETYPE).to(ConvertFilteType);
container.bind(MEDIAUPLOAD).to(MediaUploadService);
container.bind(RESIZEVIDEO).to(ResizeVideo);
export default container;

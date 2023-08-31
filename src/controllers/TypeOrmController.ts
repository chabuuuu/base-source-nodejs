import { Photo } from '../entities/Photo';
import { AppDataSource } from '../data-source/index';
// const AppDataSource = require("../data-source/index")
export class TypeOrmController {
    async getHome(req: any, res: any, next: any) {
        const photo = new Photo();
        photo.name = 'Me and Bears sadasd';
        photo.description = 'I am near polar bears';
        photo.filename = 'photo-with-bears.jpg';
        photo.views = 1;
        photo.isPublished = true;

        await AppDataSource.manager.save(photo);
        console.log('Photo has been saved. Photo id is', photo.id);
        res.send('Done!');
    }
}

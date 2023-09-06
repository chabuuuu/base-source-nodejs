export class UploadController {
    async addImage(req: any, res: any, next: any) {
        res.send('Done add image/video');
    }
    async addImageView(req: any, res: any, next: any) {
        res.render('add-image_video');
    }
}

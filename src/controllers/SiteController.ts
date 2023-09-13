import employeeService from '../config/orm-config';

export class SiteController {
    async edit(req: any, res: any, next: any) {
        const id: number = req.params.id;
        var data = '';
        res.render('edit', data);
    }
    async addData(req: any, res: any, next: any) {
        res.render('add-data');
    }
    async addImage(req: any, res: any, next: any) {
        res.render('add-image_video');
    }
    async home(req: any, res: any, next: any) {
        const result: any = await employeeService.readData({}, '10', '10', '0');
        console.log('Read done!');
        res.render('home', { result: result });
    }
}

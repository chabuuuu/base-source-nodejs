import { error } from 'console';
import employeeService from '../config/orm-config';
import orm from '../config/orm-config';
export class OrmController {
    async addData(req: any, res: any, next: any) {
        const data = req.body;
        console.log(req.body);

        await employeeService.addData(data);
        res.redirect('/');
    }
    async readAllData(req: any, res: any, next: any) {
        try {
            const result = await employeeService.readAllData();
            console.log('Read done!');
            res.render('home', { items: result });
        } catch (error) {
            next(error);
        }
    }
    async deleteData(req: any, res: any, next: any) {
        const id = req.params.id;
        await employeeService.deleteData(id);
        console.log('Delete done!');
        res.redirect('/');
    }
    async updateData(req: any, res: any, next: any) {
        const id = req.params.id;
        const data = req.body;
        await employeeService.updateData(id, data);
        console.log('Update done!');
        res.redirect('/');
    }
    async edit(req: any, res: any, next: any) {
        const id: number = req.params.id;
        var data: any = await employeeService.findData(id);
        res.render('edit', data);
    }
    async addDataView(req: any, res: any, next: any) {
        res.render('add-data');
    }
}

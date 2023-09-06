import { error } from 'console';
import employeeService from '../config/orm-config';
import orm from '../config/orm-config';
export class OrmController {
    async addData(req: any, res: any, next: any) {
        const data = req.body;
        // console.log(req.body);
        try {
            const result: any = await employeeService.addData(data);
            console.log(result);

            // res.redirect('/');
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
    async readAllData(req: any, res: any, next: any) {
        const filterData = {
            monthBirth: req.query.monthBirth,
            gender: req.query.gender,
        };
        try {
            const result: any = await employeeService.readData(filterData);
            console.log('Read done!');
            // res.render('home', { items: result });
            // res.send('Read done! All data: ' + result[0]);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
    async deleteData(req: any, res: any, next: any) {
        const id = req.params.id;
        await employeeService.deleteData(id);
        console.log('Delete done!');
        // res.redirect('/');
        res.send('Delete done! ID: ' + id);
    }
    async updateData(req: any, res: any, next: any) {
        const id = req.params.id;
        const data = req.body;
        await employeeService.updateData(id, data);
        console.log('Update done!');
        res.json(data);
        // res.send('Updare done! ID: ' + id + '\nData: ' + {data});
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

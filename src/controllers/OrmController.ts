import { error } from 'console';
import employeeService from '../config/orm-config';
import orm from '../config/orm-config';
export class OrmController {
    async addData(req: any, res: any, next: any) {
        await employeeService.addData(req, res, next);
        res.send('Done add data!');
    }
    async readAllData(req: any, res: any, next: any) {
        try {
            const result = await employeeService.readAllData();
            console.log('Read done!');
            res.send(result);
        } catch (error) {
            next(error);
        }
    }
    async deleteData(req: any, res: any, next: any) {
        await employeeService.deleteData(8);
        console.log('Delete done!');
        res.send('Delete done!');
    }
    async updateData(req: any, res: any, next: any) {
        const data = { full_name: 'name update! by typeorm' };
        await employeeService.updateData(6, data);
        console.log('Update done!');
        res.send('Update done!');
    }
}

import { error } from 'console';
import employeeService from '../config/orm-config';
import orm from '../config/orm-config';
export class OrmController {
    async addData(req: any, res: any, next: any) {
        await employeeService.addData(req, res, next);
        res.send('Done add data!');
    }
    async readAllData(req: any, res: any, next: any) {
        // const data = await employeeService.readAllData(req, res, next);
        // res.send(data);
        try {
            const result = await employeeService.readAllData(req, res, next);
            console.log(result);
            res.send(result);
        } catch (error) {
            next(error);
        }
    }
}

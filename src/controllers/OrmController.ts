import employeeService from '../config/orm-config';
import orm from '../config/orm-config';
export class OrmController {
    async addData(req: any, res: any, next: any) {
        await employeeService.addData();
        res.send('Done add data!');
    }
    async readAllData(req: any, res: any, next: any) {
        await employeeService.readAllData();
        res.send('Done read data!');
    }
}

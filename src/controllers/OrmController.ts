import { error } from 'console';
import employeeService from '../config/orm-config';
import { ConverStringToObject } from '../utils/convertStringToObject';
import orm from '../config/orm-config';
const convertStringToObject = new ConverStringToObject();
export class OrmController {
    async addData(req: any, res: any, next: any) {
        const data = req.body;
        // res.status(403).send({
        //     message: "invalid"
        // })
        try {
            const result: any = await employeeService.addData(data);
            res.json(result);
        } catch (error: any) {
            res.status(403).send({
                message: error.message,
            });
        }
    }
    async readAllData(req: any, res: any, next: any) {
        // ?query=[{key:"birthMonth", value: 09},{key: "gender", value: "Nam"}]
        // const filterData = {
        //     monthBirth: req.query.monthBirth,
        //     gender: req.query.gender,
        // };
        var filterData = {
            monthBirth: null,
            gender: null,
        };
        var query: any = req.query.query;
        if (query != null) {
            filterData = convertStringToObject.convert(query);
        }
        console.log(filterData);
        try {
            const result: any = await employeeService.readData(filterData);
            console.log('Read done!');
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
    async deleteData(req: any, res: any, next: any) {
        const id = req.params.id;
        await employeeService.deleteData(id);
        console.log('Delete done!');
        res.send('Delete done! ID: ' + id);
    }
    async updateData(req: any, res: any, next: any) {
        const id = req.params.id;
        const data = req.body;
        await employeeService.updateData(id, data);
        console.log('Update done!');
        res.json(data);
    }
}

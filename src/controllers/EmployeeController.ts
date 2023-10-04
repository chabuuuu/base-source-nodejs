import employeeService from '../config/orm-config';
import { ConverStringToObjectInterface } from '../interfaces/employee.interface';
import ormModule from '../config/employee.config';
import container from '../config/employeeController.config';
import { CONVERTSTRINGTOOBJECT } from '../config/types/employee.type';
const convertStringToObject = container.get<ConverStringToObjectInterface>(
    CONVERTSTRINGTOOBJECT,
);
export class EmployeeController {
    async addData(req: any, res: any, next: any) {
        await employeeService.connectORM();
        const data = req.body;
        try {
            const result: any = await employeeService.addData(data);
            res.json(result);
        } catch (error: any) {
            next(error);
        }
    }
    async readAllData(req: any, res: any, next: any) {
        var query: any = req.query.query;
        const page: any = req.query.page || 1;
        const perPage: any = req.query.perPage || 10;
        const skip = (page - 1) * perPage;
        var filterData = {
            monthBirth: null,
            gender: null,
        };

        if (query != null) {
            filterData = convertStringToObject.convert(query);
        }
        console.log(filterData);
        try {
            const result: any = await employeeService.readData(
                filterData,
                page,
                perPage,
                skip,
            );
            console.log('Read done!');
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
    async deleteData(req: any, res: any, next: any) {
        const id = req.params.id;
        try {
            await employeeService.deleteData(id);
            console.log('Delete done!');
            res.json({
                status: 200,
                message: 'Delete done! ID: ' + id,
            });
        } catch (error) {
            next(error);
        }
    }
    async updateData(req: any, res: any, next: any) {
        const id = req.params.id;
        const data = req.body;
        try {
            await employeeService.updateData(id, data);
            console.log('Update done!');
            res.json(data);
        } catch (error: any) {
            next(error);
        }
    }
    async login(req: any, res: any, next: any) {
        const email = req.body.email;
        const password = req.body.password;
        try {
            const user = await employeeService.login(email, password);
            console.log('Login!');
            res.json(user);
        } catch (error: any) {
            next(error);
        }
    }
}

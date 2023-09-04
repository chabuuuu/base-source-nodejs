import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { ORMInterface } from '../../orm/orm.interface';

@injectable()
export class EmployeeService {
    private orm: ORMInterface;

    constructor(
        @inject('ORMInterface') private readonly ormService: ORMInterface,
    ) {
        this.orm = ormService;
    }

    async connectORM() {
        await this.orm.connect();
    }
    async addData(req: any, res: any, next: any) {
        await this.orm.addData(req, res, next);
    }
    async readAllData(req: any, res: any, next: any) {
        const result = await this.orm.readData(req, res, next);
        console.log(result);
    }

    // Triển khai các phương thức CRUD sử dụng this.orm
}

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
    async addData() {
        await this.orm.addData();
    }
    async readAllData() {
        await this.orm.readData();
    }

    // Triển khai các phương thức CRUD sử dụng this.orm
}

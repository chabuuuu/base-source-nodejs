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
    async addData(data: any): Promise<void> {
        return await this.orm.addData(data);
    }
    async readData(filter: object): Promise<void> {
        return await this.orm.readData(filter);
    }
    async updateData(id: number, data: any): Promise<void> {
        return await this.orm.updateData(id, data);
    }
    async deleteData(id: number): Promise<void> {
        return await this.orm.deleteData(id);
    }
    async findData(id: number): Promise<void> {
        return await this.orm.findData(id);
    }

    // Triển khai các phương thức CRUD sử dụng this.orm
}

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
    async readAllData(): Promise<void> {
        return await this.orm.readData();
    }
    async updateData(id: number, data: object): Promise<void> {
        return await this.orm.updateData(id, data);
    }
    async deleteData(id: number): Promise<void> {
        return await this.orm.deleteData(id);
    }

    // Triển khai các phương thức CRUD sử dụng this.orm
}

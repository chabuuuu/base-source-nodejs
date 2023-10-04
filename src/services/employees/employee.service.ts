import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { ORMInterface } from '../../interfaces/orm.interface';
import { RedisService } from './redis/redis.service';

@injectable()
export class EmployeeService {
    private orm: ORMInterface;
    private redis: RedisService;
    private totalEMployee: number;

    constructor(
        @inject('ORMInterface') private readonly ormService: ORMInterface,
    ) {
        this.totalEMployee = 0;
        this.orm = ormService;
        this.redis = new RedisService();
        this.redis.connect();
        this.countRecord();
    }
    async countRecord() {
        this.totalEMployee = await this.orm.countRecord();
        console.log('Employee records: ' + this.totalEMployee);
    }

    async connectORM() {
        console.log('Connect to orm');
        await this.orm.connect();
    }
    async addData(data: any): Promise<void> {
        var result: any;
        try {
            result = await this.orm.addData(data);
            await this.redis.test();
        } catch (err: any) {
            return err;
        }
        return result;
    }
    async readData(
        filter: object,
        page: any,
        perPage: any,
        skip: any,
    ): Promise<void> {
        return await this.orm.readData(filter, page, perPage, skip);
    }
    async updateData(id: number, data: any): Promise<void> {
        return await this.orm.updateData(id, data);
    }
    async deleteData(id: number): Promise<void> {
        return await this.orm.deleteData(id);
    }
    async login(email: string, password: string): Promise<void> {
        return await this.orm.login(email, password);
    }

    // Triển khai các phương thức CRUD sử dụng this.orm
}

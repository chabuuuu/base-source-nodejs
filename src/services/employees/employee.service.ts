import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { ORMInterface } from '../../interfaces/orm.interface';
import { RedisService } from './redis/redis.service';
import BaseError from '../../utils/BaseError';

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
        this.countRecord();
    }
    async countRecord() {
        this.totalEMployee = await this.orm.countRecord();
        console.log('Employee records: ' + this.totalEMployee);
    }

    // async test() {
    //     var data = await this.redis.readData('');
    //     return data;
    // }

    async connectORM() {
        console.log('Connect to orm');
        await this.orm.connect();
    }
    async addData(data: any): Promise<void> {
        var result: any;
        try {
            result = await this.orm.addData(data);
            await this.redis.addData(data, result.id);
            this.totalEMployee++;
        } catch (err: any) {
            throw err;
            // return err;
        }
        return result;
    }
    async readData(
        filter: object,
        page: any,
        perPage: any,
        skip: any,
    ): Promise<void> {
        var data;
        var countRedis = 0;
        countRedis = await this.redis.count();
        console.log('Total employee record on redis: ' + countRedis);
        if (countRedis == this.totalEMployee) {
            data = await this.redis.readData(
                filter,
                page,
                perPage,
                skip,
                countRedis,
            );
            console.log('Read data on redis');
        } else {
            data = await this.orm.readData(filter, page, perPage, skip);
            console.log('Read data on normal database');
            await this.redis.syncWithDB(data);
            console.log('Done clear all data on redis');
        }
        return data;
    }
    async updateData(id: number, data: any): Promise<void> {
        try {
            const respond = await this.orm.updateData(id, data);
            await this.redis.update(id, data);
            return respond;
        } catch (error) {
            throw error;
        }
    }
    async deleteData(id: number): Promise<void> {
        try {
            const respond = await this.orm.deleteData(id);
            await this.redis.delete(id);
            return respond;
        } catch (error) {
            throw error;
        }
    }
    async login(email: string, password: string): Promise<void> {
        return await this.orm.login(email, password);
    }

    // Triển khai các phương thức CRUD sử dụng this.orm
}

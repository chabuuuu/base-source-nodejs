import { RedisClientType, createClient } from 'redis';
import { employeeRepository } from './om/person';
import client from './om/client';
import { EntityId } from 'redis-om';
export class RedisService {
    constructor() {
        this.connect();
    }

    async connect() {
        await client.connect();
        await employeeRepository.createIndex();
        console.log('Done create redis index');
    }

    async test() {}
    async addData(data: any, id: any) {
        console.log(data);
        data.id = Number(id);
        data.date_of_birth = new Date(data.date_of_birth);
        data.start_date = new Date(data.start_date);
        try {
            const employee = await employeeRepository.save(data);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async readData(data: any): Promise<any> {
        var allData;
        allData = await employeeRepository.search().return.all();
        return allData;
    }
    async count(): Promise<number> {
        var count = await employeeRepository.search().returnCount();
        console.log('Total count of redis employee: ' + count);
        return count;
    }
    async syncWithDB(data: any) {
        const dataList = data.data;

        await client.flushAll();
        await employeeRepository.createIndex();
        for (const element of dataList) {
            await employeeRepository.save(element);
        }
    }
    async delete(id: any) {
        const employee = await employeeRepository
            .search()
            .where('id')
            .equals(Number(id))
            .return.first();
        if (employee != null) {
            var redisId: any = employee[EntityId];
            console.log('ID of employee we will delete: ' + redisId);
            await employeeRepository.remove(redisId);
            console.log('Delete employee from redis!');
        }
    }
}

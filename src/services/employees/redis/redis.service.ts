import { RedisClientType, createClient } from 'redis';
import { employeeRepository } from './om/person';
import client from './om/client';
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
    async addData(data: any) {
        console.log(data);
        data.id = Number(data.id);
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
}

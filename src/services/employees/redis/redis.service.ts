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
    async addData(data: any) {}
    async readData(data: any) {
        var allData;
        allData = await employeeRepository.search().return.all();
        return allData;
    }
}

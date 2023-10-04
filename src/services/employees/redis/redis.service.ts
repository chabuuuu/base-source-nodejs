import { RedisClientType, createClient } from 'redis';

export class RedisService {
    private client: RedisClientType;
    constructor() {
        this.client = createClient();
        this.client.on('error', (err) =>
            console.log('Redis Client Error', err),
        );
    }

    async connect() {
        await this.client.connect();
        console.log('Connected to redis');
    }

    async test() {
        await this.client.set('key', 'value');
        const value = await this.client.get('key');
        console.log(value);
    }
    async addData(data: any) {}
}

// import { Client } from 'redis-om'
import { createClient } from 'redis';
/* pulls the Redis URL from .env */
const url = process.env.REDIS_URL;
console.log(url);

const client = createClient({ url: url });
client.on('error', (err) => console.log('Redis Client Error', err));
// await client.connect();
/* create and open the Redis OM Client */
// const client = await new Client().open(url)

export default client;

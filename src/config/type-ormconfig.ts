import 'dotenv/config';
import { Employee } from '../entities/Employee';
module.exports = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Employee],
    synchronize: true,
};

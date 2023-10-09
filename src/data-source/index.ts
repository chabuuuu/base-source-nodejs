import { log } from 'console';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

const config = require('../config/type-ormconfig');

const AppDataSource = new DataSource(config);

async function connect() {
    console.log('Connecting...');
    // AppDataSource.initialize()
    //     .then(() => {
    //         // here you can start to work with your database
    //         console.log('Connect!');
    //     })
    //     .catch((error) => console.log(error));

    try {
        await AppDataSource.initialize();
        console.log('Connected to typeorm!');
    } catch (error) {
        console.log(error);
    }
}
// module.exports = {connect, AppDataSource};
export { connect, AppDataSource };

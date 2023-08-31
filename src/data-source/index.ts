import { log } from "console"
import "reflect-metadata"
import { DataSource } from "typeorm"

const config = require('../config/ormconfig')

const AppDataSource = new DataSource(config)

function connect(){
    AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
        console.log("Connect!");
        
    })
    .catch((error) => console.log(error))
}
module.exports = {connect}, AppDataSource;

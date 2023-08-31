import express from 'express';
import 'reflect-metadata';
import 'dotenv/config';
import 'dotenv/config';
import { Photo } from './entities/Photo';
const db = require('../src/data-source/index');
const route = require('./routes/index');
const app = express();
const port = 3000;
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
route(app);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

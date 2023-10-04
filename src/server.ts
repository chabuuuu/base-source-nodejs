import express from 'express';
import 'reflect-metadata';
import 'dotenv/config';
import 'dotenv/config';
import { error } from 'console';
import { ErrorWithStatus } from './interfaces/ErrorWithStatus.interface';
import BaseError from './utils/BaseError';
import { RedisService } from './services/employees/redis/redis.service';
const path = require('path');
const route = require('./routes/index');
const app = express();
const handlebars = require('express-handlebars');
const morgan = require('morgan');
var methodOverride = require('method-override');
const port = 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
//Override method
app.use(methodOverride('_method'));

// HTTP LOG
app.use(morgan('combined'));

//template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a: any, b: any) => a + b,
        },
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// const redisService = new RedisService();
// redisService.connect();
// redisService.test();

route(app);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

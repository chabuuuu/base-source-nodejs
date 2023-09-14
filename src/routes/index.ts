import BaseError from '../utils/BaseError';
const employeeRouter = require('./employee');
const mediaRouter = require('./media');
const siteRouter = require('./site');

function route(app: any) {
    app.use('/api/v1/employees', employeeRouter);
    app.use('/api/v1/media', mediaRouter);
    app.use('/api/v1/site', siteRouter);
    app.all('*', (req: any, res: any, next: any) => {
        const status = 'fail';
        const statusCode = 404;
        const err = new BaseError(statusCode, status, 'Can not find this page');
        next(err);
    });
    app.use((error: BaseError, req: any, res: any, next: any) => {
        error.statusCode = error.statusCode || 500;
        error.status = error.status || 'error';
        console.log('This error' + error);
        res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message,
        });
    });
}
module.exports = route;

const employeeRouter = require('./employee');
const mediaRouter = require('./media');
const siteRouter = require('./site');

function route(app: any) {
    app.use('/api/v1/employees', employeeRouter);
    app.use('/api/v1/media', mediaRouter);
    app.use('/api/v1/site', siteRouter);
}
module.exports = route;

const homeCotroller = require('../controllers/HomeController')
function route(app: any){
    app.use('/', homeCotroller.getHome);
}
module.exports = route;
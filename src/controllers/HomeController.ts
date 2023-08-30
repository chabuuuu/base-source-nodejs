class HomeController{
    getHome(req : any, res: any, next : any) {
       res.send('Done!'); 
    }
}
module.exports = new HomeController();
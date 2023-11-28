const Pages = require("../Config/Pages");
const { Render } = require("./RenderController");

class HomeController{
    async Index (req, res){
        Render(req, res, Pages.PAGE_HOME, {});      
    }
}


module.exports = new HomeController();
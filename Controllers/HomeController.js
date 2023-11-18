const Routes = require("../Config/Routes");

class HomeController{
    async Index (req, res){
        let mensagem = req.session.Mensagem;
        req.session.Mensagem = null;
        res.render('Home', { Usuario: req.session.user, Mensagem:mensagem});      
    }
}


module.exports = new HomeController();
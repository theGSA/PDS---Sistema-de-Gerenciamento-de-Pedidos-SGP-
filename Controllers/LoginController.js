
const { render } = require("ejs");
const Pages = require("../Config/Pages");
const RenderController = require("./RenderController");
const { Render } = require("./RenderController");

class LoginController{
    async Index (req, res){
        await Render(req, res, Pages.PAGE_LOGIN, {});
    }

    async RecuperarSenha(req, res){
        await Render(req, res, Pages.PAGE_LOGIN_RECUPERAR_SENHA, {});
    }

    async Cadastrar(req, res){
        RenderController.Render(req, res, Pages.PAGE_LOGIN_CADASTRAR, {});
    }
}


module.exports = new LoginController();
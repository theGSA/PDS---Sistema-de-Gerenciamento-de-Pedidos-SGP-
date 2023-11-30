const Pages = require("../Config/Pages");
const Routes = require("../Config/Routes");
const { Usertype } = require("../Models/Usuario");


class RenderController
{
    HasAccess(Page, ){

    }

    async Render(req, res, pageName, objPages){
        let Mensagem = req.session.Mensagem;
        req.session.Mensagem = null;

        objPages.Usuario = req.session.user;
        objPages.Mensagem = Mensagem;
        objPages.Page = req.path.split('/')[1].toLowerCase();

        const canAcess = ['login', 'cardapio', 'cadastrar'];

        //se o usuario difente de funcionario redireciona para cardapio
        if(!canAcess.includes(objPages.Page.toLowerCase()) && (!objPages.Usuario || objPages.Usuario.Usertype != Usertype.FUNCIONARIO ))
        {
            res.redirect(Routes.GET_CARDAPIO);
            return;   
        }
        
        res.render(pageName, objPages ,(err,html)=>{
            console.log(err);
            res.send( err ? '<h2>Erro na página!</h2>' : html);
        });
        
    }
}

module.exports = new RenderController();
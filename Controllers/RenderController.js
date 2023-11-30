

class RenderController
{
    async Render(req, res, pageName, objPages){
        let Mensagem = req.session.Mensagem;
        req.session.Mensagem = null;

        objPages.Usuario = req.session.user;
        objPages.Mensagem = Mensagem;
        objPages.Page = req.path.split('/')[1].toLowerCase();

        res.render(pageName, objPages ,(err,html)=>{
            console.log(err);
            res.send( err ? '<h2>Erro na página!</h2>' : html);
        });
    }
}

module.exports = new RenderController();

class LoginController{
    async Index (req, res){
        let mensagem = req.session.Mensagem;
        req.session.Mensagem = null;

        res.render('Login', {Mensagem: mensagem, Usuario:global?.Usuario});
    }

    async RecuperarSenha(req, res){
        res.render('RecuperarSenha');
    }

    async Cadastrar(req, res){
        let mensagem = req.session.Mensagem;
        req.session.Mensagem = null;
        let usuario = req.session.Usuario;
       res.render('Cadastrar', {Usuario: usuario , Mensagem:mensagem});
    }
}


module.exports = new LoginController();
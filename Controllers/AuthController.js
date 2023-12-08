const {Usuario, Usertype} = require('../Models/Usuario');
const Utils = require('../Utils/Utils'); 
const { Mensagem, tipoMensagem } = require('../Models/Mensagem');
const Security = require('../Utils/Security');
const Routes = require('../Config/Rotas');


class AuthController{
    async Index (req, res){
        const {Email, Password} = req.body;
        
        const securePassword = await Security.CreateSecurity(Email, Password);
        const _user = await Usuario.findOne( {where:{Email: Email ?? '', Password: securePassword}});

        if(_user == null){
            req.session.Mensagem = new Mensagem(tipoMensagem.ERRO, 'Usuário ou senha inválidos!');
            req.session.Usuario = req.body;
            res.redirect(Routes.GET_LOGIN);
        }
        else{
            req.session.user = _user.dataValues;
            req.session.touch();
            res.redirect(Routes.GET_CARDAPIO);     
        }
    }

    async SemCadastro(req, res){
        const a = req.body;

        if(a.Nome == '' || a.Nome.length < 2)
        {
            req.session.Mensagem = new Mensagem(tipoMensagem.ERRO, 'Informe um nome válido!');
            res.redirect(Routes.GET_LOGIN);
        }
        else{
            let obj = {
                Nome: a.Nome,
                Usertype: Usertype.NAO_CADASTRADO
            }

            const user = await Usuario.create(obj);
            req.session.Mensagem = new Mensagem(tipoMensagem.SUCCESS, `Bem vindo(a) ${user.Nome}`);
            req.session.user = user.dataValues;
            req.session.touch();
            res.redirect(Routes.GET_CARDAPIO);
        }
    }
    async Logout(req, res){
        req.session.user = null;
        req.session.Mensagem =  new Mensagem(tipoMensagem.SUCCESS,  'Volte sempre!');
        res.redirect(Routes.GET_LOGIN);
    }
    
    static async ValidarCadastro(obj, req){

        if(!obj.Email || obj.Email == '')
        {
            req.session.Mensagem = new Mensagem(tipoMensagem.ERRO, 'Preencha o campo e-mail!');
            return false;
        }
        if(!Utils.validateEmail(obj.Email)){
            req.session.Mensagem = new Mensagem(tipoMensagem.ERRO, 'O e-mail informado não é válido!');
            return false;
        }

        if(await Usuario.findOne({where:{Email:obj.Email}}))
        {
            req.session.Mensagem = new Mensagem(tipoMensagem.ERRO, 'Este e-mail já foi cadastrado!');
            return false;
        }

        return true;
    }

    async Cadastrar(req, res){
        if( await AuthController.ValidarCadastro(req.body, req) == false){
            req.session.Usuario = req.body;
            res.redirect(Routes.GET_LOGIN_CADASTRAR);
        }
        else{
            let obj = {
                Nome: req.body.Nome,
                Email: req.body.Email,
                Telefone: req.body.Telefone,
                Usertype: Usertype.CLIENTE,
                Password: await Security.CreateSecurity(req.body.Email, req.body.Password),
            }

             Usuario.create(obj)
             .then(sucess => {
                req.session.user = sucess;
                req.session.Mensagem = new Mensagem(tipoMensagem.SUCCESS, 'Usuário cadastrado com sucesso!');
                res.redirect(Routes.GET_CARDAPIO);
             })
             .catch(err=>{
                req.session.Mensagem = new Mensagem(tipoMensagem.ERRO, 'Erro ao finalizar cadastro. Entre em contato com o administrador do sistema.');
                res.redirect(Routes.GET_LOGIN_CADASTRAR);
            })
        }
    }
    async RecuperarSenha(req, res){
        const elapsedtime = (Date.now() - req.session.tempoUltimoEmail);

        //verifica o tempo do ultimo request para nao enviar a vários emails;
        if(req.session.tempoUltimoEmail && elapsedtime < 60000)
        {
            req.session.Mensagem = new Mensagem(tipoMensagem.ERRO, "Aguarde para fazer uma nova requisição!");
        }
        else{            
            const {Email} = req.body;
            const client =  await Usuario.findOne({where:{Email:Email}});
            
            if(client){
                req.session.Mensagem = new Mensagem(tipoMensagem.SUCCESS, "Email de recuperação enviado!");
                req.session.tempoUltimoEmail = Date.now();
            }
            else{
                req.session.Mensagem = new Mensagem(tipoMensagem.ERRO, "Email não cadastrado!");
            }
        }
        res.redirect(Routes.GET_LOGIN_RECUPERAR_SENHA);
    }
}


module.exports = new AuthController();
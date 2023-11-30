

const Pages = require('../Config/Pages');
const Routes = require('../Config/Routes');
const { Usuario, Usertype} = require('../Models/Usuario');
const { Mensagem, tipoMensagem } = require('../Models/Mensagem');
const Sequelize = require('sequelize');
const { Render } = require('./RenderController');
class FuncionarioController{
    async Index(req, res){
          
        const listaFuncionarios = await Usuario.findAll(
        {
            where: {
                [Sequelize.Op.or]: [
                { Usertype: Usertype.FUNCIONARIO }
                ]
            }
            }
        );
    
        Render(req, res,Pages.PAGE_FUNCIONARIO, {Funcionarios : listaFuncionarios});
    }


    async PostGetEditModal(req, res){
        const {Id} = req.body;
        const funcionario = await Usuario.findByPk(Id);
        
        const Usertype = [
            {Id:1, Descricao: 'Não cadastrado'},
            {Id:2, Descricao: 'Cliente'},
            {Id:3, Descricao: 'Funcionário'},
        ]

        Render(req, res,Pages.PAGE_MODAL_FUNCIONARIO, {Funcionario: funcionario, Usertype:Usertype, layout: false});
    }

    async PostGetDeleteModal(req, res){
        const {Id} = req.body;
        const funcionario = await Usuario.findByPk(Id);
        funcionario.Rota = Routes.POST_CLIENTE_DELETAR;
        Render(req, res,Pages.PAGE_PARTIALS_MODAL_DELETAR, {Model: funcionario,  layout: false});
    }

    async PostCadastrar(req, res){
        const {Id, Nome, Descricao} = req.body;

        var objRes = null;
        if(Id > 0)
            objRes = await Usuario.update(req.body, {where:{Id: Id}});
        else{
            req.body.Id = null;
            objRes = await Usuario.create(req.body);
        }
        if(objRes)
            req.session.Mensagem = new Mensagem(tipoMensagem.SUCCESS, 'Funcionario atualizado com sucesso!');
        else
            req.session.Mensagem = new Mensagem(tipoMensagem.SUCCESS, 'Erro ao salvar funcionario!');

        res.redirect(Routes.GET_FUNCIONARIOS);
    }

    async PostDeletar(req, res){
        const {Id} = req.body;

        const objRes = await Usuario.destroy({where:{Id:Id}});
        if(objRes > 0)
            req.session.Mensagem = new Mensagem( tipoMensagem.SUCCESS, 'Funcionário excluído!');
        else
            req.session.Mensagem = new Mensagem( tipoMensagem.ERRO, 'Erro ao excluir funcionário!');

        res.redirect(Routes.GET_FUNCIONARIOS);

    }
}

module.exports  = new FuncionarioController();
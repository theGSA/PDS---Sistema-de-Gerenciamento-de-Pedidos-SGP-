

const Pages = require('../Config/Pages');
const Routes = require('../Config/Routes');
const { Usuario, Usertype} = require('../Models/Usuario');
const { Mensagem, tipoMensagem } = require('../Models/Mensagem');
const Sequelize = require('sequelize');
const { Render } = require('./RenderController');
class ClienteController{
    async Index(req, res){
          
        const listaClientes = await Usuario.findAll(
        {
            where: {
                [Sequelize.Op.or]: [
                { Usertype: Usertype.CLIENTE },
                { Usertype: Usertype.NAO_CADASTRADO }
                ]
            }
            }
        );
    
        Render(req, res,Pages.PAGE_CLIENTE, {Clientes : listaClientes});
    }


    async PostGetEditModal(req, res){
        const {Id} = req.body;
        const cliente = await Usuario.findByPk(Id);
        
        const Usertype = [
            {Id:1, Descricao: 'Não cadastrado'},
            {Id:2, Descricao: 'Cliente'},
            {Id:3, Descricao: 'Funcionário'},
        ]

        Render(req, res,Pages.PAGE_MODAL_CLIENTE, {Cliente: cliente, Usertype:Usertype, layout: false});
    }

    async PostGetDeleteModal(req, res){
        const {Id} = req.body;
        const cliente = await Usuario.findByPk(Id);
        cliente.Rota = Routes.POST_CLIENTE_DELETAR;
        Render(req, res,Pages.PAGE_PARTIALS_MODAL_DELETAR, {Model: cliente,  layout: false});
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
            req.session.Mensagem = new Mensagem(tipoMensagem.SUCCESS, 'Cliente atualizado com sucesso!');
        else
            req.session.Mensagem = new Mensagem(tipoMensagem.SUCCESS, 'Erro ao salvar cliente!');

        res.redirect(Routes.GET_CLIENTES);
    }

    async PostDeletar(req, res){
        const {Id} = req.body;

        const objRes = await Usuario.destroy({where:{Id:Id}});
        if(objRes > 0)
            req.session.Mensagem = new Mensagem( tipoMensagem.SUCCESS, 'Cliente excluído!');
        else
            req.session.Mensagem = new Mensagem( tipoMensagem.ERRO, 'Erro ao excluir cliente!');

        res.redirect(Routes.GET_CATEGORIAS);

    }
}

module.exports  = new ClienteController();
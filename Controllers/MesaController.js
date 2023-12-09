

const Pages = require('../Config/Pages');
const Routes = require('../Config/Rotas');
const Mesa = require('../Models/Mesa');
const { Mensagem, tipoMensagem } = require('../Models/Mensagem');
const { Render } = require('./RenderController');

class MesaController{
    async Index(req, res){
          
        const listaMesas = await Mesa.findAll();
    
        Render(req, res,Pages.PAGE_MESA, {Mesas : listaMesas});
    }


    async PostGetEditModal(req, res){
        const {Id} = req.body;
        const mesa = await Mesa.findByPk(Id);
        
        const Usertype = [
            {Id:1, Descricao: 'Não cadastrado'},
            {Id:2, Descricao: 'Cliente'},
            {Id:3, Descricao: 'Mesa'},
        ]

        Render(req, res, Pages.PAGE_MODAL_MESA, {Mesa: mesa, Usertype:Usertype, layout: false});
    }

    async PostGetDeleteModal(req, res){
        const {Id} = req.body;
        const mesa = await Mesa.findByPk(Id);
        mesa.Rota = Routes.POST_MESA_DELETAR;
        Render(req, res,Pages.PAGE_PARTIALS_MODAL_DELETAR, {Model: mesa,  layout: false});
    }

    async PostCadastrar(req, res){
        const {Id, Nome, Descricao} = req.body;

        var objRes = null;
        if(Id > 0)
            objRes = await Mesa.update(req.body, {where:{Id: Id}});
        else{
            req.body.Id = null;
            objRes = await Mesa.create(req.body);
        }
        if(objRes)
            req.session.Mensagem = new Mensagem(tipoMensagem.SUCCESS, `Mesa ${Id > 0 ? 'atualizada' : 'cadastrada'} com sucesso!`);
        else
            req.session.Mensagem = new Mensagem(tipoMensagem.ERRO, 'Erro ao salvar mesa!');

        res.redirect(Routes.GET_MESA);
    }

    async PostDeletar(req, res){
        const {Id} = req.body;

        const objRes = await Mesa.destroy({where:{Id:Id}});
        if(objRes > 0)
            req.session.Mensagem = new Mensagem( tipoMensagem.SUCCESS, 'Mesa excluída!');
        else
            req.session.Mensagem = new Mensagem( tipoMensagem.ERRO, 'Erro ao excluir mesa!');

        res.redirect(Routes.GET_MESA);

    }
}

module.exports  = new MesaController();
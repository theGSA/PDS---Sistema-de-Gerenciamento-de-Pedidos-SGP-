
const session = require('express-session');
const Pages = require('../Config/Pages');
const Routes = require('../Config/Routes');
const Categoria = require('../Models/Categoria');
const { Mensagem, tipoMensagem } = require('../Models/Mensagem');
const { Render } = require('./RenderController');

class CategoriaController{
    async Index(req, res){
        
        const listaCategorias = await Categoria.findAll();
        
        Render(req, res,Pages.PAGE_CATEGORIA, {Mensagem: Mensagem, Usuario:req.session.user, Categorias : listaCategorias});
    }


    async PostGetEditModal(req, res){
        const {Id} = req.body;
        const categoria = await Categoria.findByPk(Id);
    
        Render(req, res,Pages.PAGE_PARTIALS_MODAL_CATEGORIA, {Categoria: categoria, layout: false});
    }

    async PostGetDeleteModal(req, res){
        const {Id} = req.body;
        const categoria = await Categoria.findByPk(Id);
        categoria.Rota = Routes.POST_CATEGORIA_DELETAR;
        Render(req, res,Pages.PAGE_PARTIALS_MODAL_DELETAR, {Model: categoria,  layout: false});
    }

    async PostCadastrar(req, res){
        const {Id, Nome, Descricao} = req.body;

        var objRes = null;
        if(Id > 0)
            objRes = await Categoria.update(req.body, {where:{Id: Id}});
        else{
            req.body.Id = null;
            objRes = await Categoria.create(req.body);
        }
        if(objRes)
            req.session.Mensagem = new Mensagem(tipoMensagem.SUCCESS, 'Categoria atualizado com sucesso!');
        else
            req.session.Mensagem = new Mensagem(tipoMensagem.SUCCESS, 'Erro ao salvar categoria!');

        await res.redirect(Routes.POST_CATEGORIA);
    }

    async PostDeletar(req, res){
        const {Id} = req.body;

        const objRes = await Categoria.destroy({where:{Id:Id}});
        if(objRes > 0)
            req.session.Mensagem = new Mensagem( tipoMensagem.SUCCESS, 'Categoria excluída!');
        else
            req.session.Mensagem = new Mensagem( tipoMensagem.ERRO, 'Erro ao excluir categoria!');

        res.redirect(Routes.GET_CATEGORIAS);

    }
}

module.exports  = new CategoriaController();
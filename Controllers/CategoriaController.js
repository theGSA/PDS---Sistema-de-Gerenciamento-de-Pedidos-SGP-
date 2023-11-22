
const session = require('express-session');
const Routes = require('../Config/Routes');
const Categoria = require('../Models/Categoria');
const { Mensagem, tipoMensagem } = require('../Models/Mensagem');

class CategoriaController{
    async Index(req, res){
        let Mensagem = req.session.Mensagem;
        req.session.Mensagem = null;
        
        const listaCategorias = await Categoria.findAll();
        
        res.render('Categoria', {Mensagem: Mensagem, Usuario:req.session.user, Categorias : listaCategorias});
    }


    async PostGetEditModal(req, res){
        const {Id} = req.body;
        const categoria = await Categoria.findByPk(Id);
    
        res.render('partials/ModalCategoria', {Categoria: categoria, layout: false});
    }

    async PostGetDeleteModal(req, res){
        const {Id} = req.body;
        const categoria = await Categoria.findByPk(Id);
        categoria.Rota = 'categoria/Deletar'
        res.render('partials/ModalDelete', {Model: categoria,  layout: false});
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

        res.redirect(Routes.POST_CATEGORIA);
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
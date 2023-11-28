

const Routes = require('../Config/Routes');
const Produto = require('../Models/Produto');
const { Mensagem, tipoMensagem } = require('../Models/Mensagem');
const Categoria = require('../Models/Categoria');
const Pages = require('../Config/Pages');
const { Render } = require('./RenderController');

class ProdutoController{
    async Index(req, res){
        const listaProdutos = await Produto.findAll({include: [{model: Categoria}]});
        
        Render(req, res,Pages.PAGE_PRODUTO, {Produtos : listaProdutos});
    }


    async PostGetEditModal(req, res){
        const {Id} = req.body;
        const produto = await Produto.findByPk(Id);
        const categorias = await Categoria.findAll();   
    
        Render(req, res,Pages.PAGE_PARTIALS_MODAL_PRODUTO, {Produto: produto, Categorias:categorias, layout: false});
    }

    async PostGetDeleteModal(req, res){
        const {Id} = req.body;
        const produto = await Produto.findByPk(Id);

        produto.Rota = 'Produto/Deletar';
        Render(req, res,Pages.PAGE_PARTIALS_MODAL_DELETAR, {Model: produto,  layout: false});
    }

    async PostCadastrar(req, res){
        const {Id} = req.body;

        var objRes = null;
        if(Id > 0)
            objRes = await Produto.update(req.body, {where:{Id: Id}});
        else{
            req.body.Id = null;
            objRes = await Produto.create(req.body);
        }
        if(objRes)
            req.session.Mensagem = new Mensagem(tipoMensagem.SUCCESS, 'Produto atualizado com sucesso!');
        else
            req.session.Mensagem = new Mensagem(tipoMensagem.SUCCESS, 'Erro ao salvar produto!');

        res.redirect(Routes.POST_PRODUTO);
    }

    async PostDeletar(req, res){
        const {Id} = req.body;

        const objRes = await Produto.destroy({where:{Id:Id}});
        if(objRes > 0)
            req.session.Mensagem = new Mensagem( tipoMensagem.SUCCESS, 'Produto excluído!');
        else
            req.session.Mensagem = new Mensagem( tipoMensagem.ERRO, 'Erro ao excluir produto!');

        res.redirect(Routes.GET_PRODUTOS);

    }
}

module.exports  = new ProdutoController();


const Routes = require('../Config/Routes');
const Produto = require('../Models/Produto');
const { Mensagem, tipoMensagem } = require('../Models/Mensagem');
const Categoria = require('../Models/Categoria');

class ProdutoController{
    async Index(req, res){
        let Mensagem = req.session.Mensagem;
        req.session.Mensagem = null;
        
        const listaProdutos = await Produto.findAll();
        
        res.render('Produto', {Mensagem: Mensagem, Usuario:req.session.user, Produtos : listaProdutos});
    }


    async PostGetEditModal(req, res){
        const {Id} = req.body;
        const produto = await Produto.findByPk(Id);
        const categorias = await Categoria.findAll();   
    
        res.render('partials/ModalProduto', {Produto: produto, Categorias:categorias, layout: false});
    }

    async PostGetDeleteModal(req, res){
        const {Id} = req.body;
        const produto = await Produto.findByPk(Id);

        produto.Rota = 'Produto/Deletar';
        res.render('partials/ModalDelete', {Model: produto,  layout: false});
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
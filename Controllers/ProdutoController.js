

const Routes = require('../Config/Rotas');
const Produto = require('../Models/Produto');
const { Mensagem, tipoMensagem } = require('../Models/Mensagem');
const Categoria = require('../Models/Categoria');
const Pages = require('../Config/Pages');
const { Render } = require('./RenderController');
const { BlobToBase64Content } = require('../Utils/Utils');

class ProdutoController{
    async Index(req, res){
        const listaProdutos = await Produto.findAll({include: [{model: Categoria}]});
        
        Render(req, res, Pages.PAGE_PRODUTO, {Produtos : listaProdutos});
    }


    async PostGetEditModal(req, res){
        const {Id} = req.body;
        const produto = await Produto.findByPk(Id);
        const categorias = await Categoria.findAll();
        
        if(produto && produto.Imagem)
        {
            //gera o base 64 da imagem
            produto.Imagem64 = `data:${produto.TipoImagem};base64, ${BlobToBase64Content(produto.Imagem)}`;
        }
    
        Render(req, res,Pages.PAGE_MODAL_PRODUTO, {Produto: produto, Categorias:categorias, layout: false});
    }

    async PostGetDeleteModal(req, res){
        const {Id} = req.body;
        const produto = await Produto.findByPk(Id);

        produto.Rota = Routes.POST_PRODUTO_DELETAR;
        Render(req, res,Pages.PAGE_PARTIALS_MODAL_DELETAR, {Model: produto,  layout: false});
    }

    async PostCadastrar(req, res){
        const {Id} = req.body;

        var objRes = null;

        if(req.files && req.files.Imagem){
            //guarda a imagem mandada pelo formulário
            req.body.Imagem = req.files.Imagem.data;
            req.body.NomeImage = req.files.Imagem.name;
            req.body.TipoImagem = req.files.Imagem.mimetype;
        }
        // else if(Id > 0){
        //     //caso contrario
        //     const p = await Produto.findByPk(Id);
        //     req.body.Imagem = p.Imagem;
        //     req.body.NomeImage = p.NomeImage;
        //     req.body.TipoImagem = p.TipoImagem;
        // }

        if(Id > 0)
            objRes = await Produto.update(req.body, {where:{Id: Id}});
        else{
            req.body.Id = null;
            objRes = await Produto.create(req.body);
        }
        if(objRes)
            req.session.Mensagem = new Mensagem(tipoMensagem.SUCCESS, `Produto ${ Id > 0 ? 'atualizado': 'cadastrado'} com sucesso!`);
        else
            req.session.Mensagem = new Mensagem(tipoMensagem.ERRO, 'Erro ao salvar produto!');

        res.redirect(Routes.GET_PRODUTO);
    }

    async PostDeletar(req, res){
        const {Id} = req.body;

        const objRes = await Produto.destroy({where:{Id:Id}});
        if(objRes > 0)
            req.session.Mensagem = new Mensagem( tipoMensagem.SUCCESS, 'Produto excluído!');
        else
            req.session.Mensagem = new Mensagem( tipoMensagem.ERRO, 'Erro ao excluir produto!');

        res.redirect(Routes.GET_PRODUTO);

    }
}

module.exports  = new ProdutoController();
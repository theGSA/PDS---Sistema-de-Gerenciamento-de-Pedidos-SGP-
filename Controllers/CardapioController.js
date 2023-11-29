const Pages = require("../Config/Pages");
const RenderController = require("./RenderController");
const Categoria = require('../Models/Categoria');
const Produto = require('../Models/Produto');
const { BlobToBase64Content } = require("../Utils/Utils");

class CardapioController{
    async Index(req, res){       
        const _listaCategorias = await Categoria.findAll();
        const listaCategorias = [];

        for(const element of _listaCategorias){
            const obj  = await Produto.findAll({where: {IdCategoria: element.Id}});
            const objCategoria = element.dataValues;
            objCategoria.Produtos = obj;

            if(objCategoria.Produtos != null && objCategoria.Produtos.length > 0){
                for(var produto of objCategoria.Produtos)
                {
                    if(produto.Imagem)
                    {
                        produto.Imagem64 = `data:${produto.TipoImagem};base64, ${BlobToBase64Content(produto.Imagem)}`;
                    }
                }
                listaCategorias.push(objCategoria);
            }
        }
        
       RenderController.Render(req, res, Pages.PAGE_CARDAPIO,{Categorias : listaCategorias});
    }
}

module.exports  = new CardapioController();
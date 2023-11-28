const Pages = require("../Config/Pages");
const RenderController = require("./RenderController");
const Categoria = require('../Models/Categoria');
const Produto = require('../Models/Produto');

class CardapioController{
    async Index(req, res){
       
        const listaProduto = [];
        const categorias = ["Carnes e Frangos", "Bebidas", "Saladas", "Peixes e Frutos do Mar", "Risotos", "Hamburgueres" ]
        const _listaCategorias = await Categoria.findAll();
        const listaCategorias = [];

        for(const element of _listaCategorias){
            const obj  = await Produto.findAll({where: {IdCategoria: element.Id}});
            const objCategoria = element.dataValues;
            objCategoria.Produtos = obj;

            if(objCategoria.Produtos != null && objCategoria.Produtos.length > 0)
                listaCategorias.push(objCategoria);
        }
        

        var a = '';

        // for(var j = 1; j < categorias.length; j++)
        // {
        //     listaCategorias.push({
        //         Id : j,
        //         Nome: categorias.at(j-1)
        //     })
        // }

        // for(var i = 1; i < 10; i++)
        // {
        //     var produto={
        //         Id: i,
        //         Nome: `nome_${i}`,
        //         Descricao: `Essa é uma descrição do produto ${i}`,
        //         Id_categoria: Math.round(Math.random() * 5 +1),
        //         Valor: 10.00
        //     }
        //     listaProduto.push(produto);
        // }
       RenderController.Render(req, res, Pages.PAGE_CARDAPIO,{Categorias : listaCategorias});
    }
}

module.exports  = new CardapioController();
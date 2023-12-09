const Pages = require("../Config/Pages");
const RenderController = require("./RenderController");
const PedidoController = require('./PedidoController');
const Categoria = require('../Models/Categoria');
const Produto = require('../Models/Produto');

const PedidoProduto = require("../Models/PedidoProduto");


class CardapioController{
    async Index(req, res){       
        let _listaCategorias = Categoria.findAll();
        let listaCategorias = [];
        await Promise.all([PedidoController.InicializarPedido(req, req), _listaCategorias])
        .then(async (result) =>{
            _listaCategorias = result[1];
            const pedido = req.session.Pedido;
            
            for(const element of _listaCategorias){
                const obj  = await Produto.findAll({where: {IdCategoria: element.Id}});
                const objCategoria = element.dataValues;
                
                objCategoria.Produtos = obj;          

                if(objCategoria.Produtos != null && objCategoria.Produtos.length > 0){
                    for(var produto of objCategoria.Produtos)
                    {
                        const p = pedido.PedidoProdutos?.find(o => o.IdProduto == produto.Id)                     
                        if(p){
                            produto.QuantidadePedido = p.Quantidade;
                        }
                    }
                    listaCategorias.push(objCategoria);
                }
            }
        
            RenderController.Render(req, res, Pages.PAGE_CARDAPIO,{Categorias : listaCategorias, Pedido: pedido});
        })
    }

    //recebe via post as ações de adicionar e remover item dos pedidos
    //e atualiza a pagina de cardapio
    async Cardapio(req, res)
    {
        //tipoRetorno: 'ModalUpdate',
        const {acao, tipoRetorno, IdProduto} = req.body;

        if(acao == 'remover'){
            await PedidoController.RemoverProduto(req, res, IdProduto);
        }
        else if(acao == 'adicionar'){
           await PedidoController.AdicionarProduto(req, res, IdProduto);
        }
        
        let pedido = req.session.Pedido;
        if(tipoRetorno == 'ModalUpdate'){
            //RenderController.Render(req, res, Pages.PAGE_MODAL_PEDIDO_CLIENTE,{Pedido: pedido, layout:false}) 
            await PedidoController.ObterModalPedidosCliente(req, res);
        }
        else{

            res.send(pedido); 
        }
    }

    async ObterModalQuestaoLogout(req, res)
    {
        const Questao = {
            Mensagem: 'deseja deslogar do sistema?',
            AcaoSim: '/auth/logout',
        }
        RenderController.Render(req, res, Pages.PAGE_PARTIALS_MODAL_QUESTAO, {Questao:Questao, layout:false});
    }

    
}

module.exports  = new CardapioController();
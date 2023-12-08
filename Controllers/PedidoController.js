

const Pages = require('../Config/Pages');
const Routes = require('../Config/Rotas');
const { Pedido,StatusPedido} = require('../Models/Pedido');
const { Mensagem, tipoMensagem } = require('../Models/Mensagem');
const Sequelize = require('sequelize');
const { Render } = require('./RenderController');
const { Usuario } = require('../Models/Usuario');
const PedidoProduto = require('../Models/PedidoProduto');
const Produto = require('../Models/Produto');

const strStatusPedido = {
    [StatusPedido.INCOMPLETO] : 'Incompleto',
    [StatusPedido.PENDENTE] : 'Pendente',
    [StatusPedido.EM_PREPARACAO] : 'Em preparação',
    [StatusPedido.ENTREGUE] : 'Entregue',
    [StatusPedido.FINALIZADO] : 'Finalizado',
}

class PedidoController{
    constructor(){

    }
    async Index(req, res){
        //todo: não deveria precisar instanciar a classe
        let iniPedido = new PedidoController().InicializarPedido(req, res);
        let listaPedidos = Pedido.findAll();

        await Promise.all([iniPedido, listaPedidos])
        .then(async (result)=>{
            listaPedidos = result[1];
            for(var pedido of listaPedidos)
            {
                pedido.strStatus = strStatusPedido[pedido.Status];
                await Usuario.findByPk(pedido.IdUsuario).then(usuario=>{
                    pedido.Usuario = usuario;
                });
            }
            
            Render(req, res,Pages.PAGE_PEDIDO, {Pedidos : listaPedidos});
        })
    }

    async PostGetEditModal(req, res){
        const {Id} = req.body;

        Pedido.findByPk(Id)
        .then(pedido=>{
            Render(req, res,Pages.PAGE_MODAL_PEDIDO, {Pedido: pedido, Usertype:Usertype, layout: false});
        })
    }

    async PostGetDeleteModal(req, res){
        const {Id} = req.body;
       
        Pedido.findByPk(Id)
        .then(pedido=>{
            pedido.Rota = Routes.POST_PEDIDO_DELETAR;
            Render(req, res,Pages.PAGE_PARTIALS_MODAL_DELETAR, {Model: pedido,  layout: false});
        })
    }

    async PostCadastrar(req, res){
        const {Id, Nome, Descricao} = req.body;

        var objRes = null;
        if(Id > 0)
            objRes = await Pedido.update(req.body, {where:{Id: Id}});
        else{
            req.body.Id = null;
            objRes = await Pedido.create(req.body);
        }
        if(objRes)
            req.session.Mensagem = new Mensagem(tipoMensagem.SUCCESS, 'Pedido atualizado com sucesso!');
        else
            req.session.Mensagem = new Mensagem(tipoMensagem.ERRO, 'Erro ao salvar fedido!');

        res.redirect(Routes.GET_PEDIDO);
    }

    async PostDeletar(req, res){
        const {Id} = req.body;

        const objRes = await Pedido.destroy({where:{Id:Id}});
        if(objRes > 0)
            req.session.Mensagem = new Mensagem( tipoMensagem.SUCCESS, 'Pedido excluído!');
        else
            req.session.Mensagem = new Mensagem( tipoMensagem.ERRO, 'Erro ao excluir funcionário!');

        res.redirect(Routes.GET_PEDIDO);

    }

    async ObterUsuarioPorStatusDoPedido(IdUsuario, statusPedido)
    {
        return await Pedido.findOne(
        {
            where:{
                IdUsuario: IdUsuario,
                Status: statusPedido
            },
            include:[
                {model: PedidoProduto},
            ]
        });    
    }

    async InicializarPedido(req, res){
        //verifica se existe um pedido em status de incompleto
        const usuario = req.session.user;
        req.session.Pedido = await this.ObterUsuarioPorStatusDoPedido(usuario.Id, StatusPedido.INCOMPLETO);
        
        //se um pedido com status incompleto não é encontrado entao cria um novo
        if(req.session.Pedido == null)
        {
            req.session.Pedido = await Pedido.create({
                IdUsuario: usuario.Id,
                Status: StatusPedido.INCOMPLETO,
                IdMesa: 1,
            })
        }
    }

    async ObterPedidoAtual(req)
    {
        //obtem o Pedido atual e popula a lista de itens do pedido
        const curPedido = req.session.Pedido;
        return await Pedido.findOne({
            where: {Id: curPedido.Id},
            include:[{
                model:PedidoProduto,
            }]
        });
    }

    async RemoverProduto(req, res, IdProduto){
        this.InicializarPedido(req, res);
        const pedido = await this.ObterPedidoAtual(req);
        var pedidoProduto =  pedido.PedidoProdutos.find(o => o.IdProduto == IdProduto); 
        //var produto = await Produto.findByPk(IdProduto);

        if(pedidoProduto){
            let _pp = pedidoProduto.dataValues;
            if(_pp.Quantidade > 0){
                _pp.Quantidade--;
                _pp.ValorTotal = _pp.Quantidade * _pp.ValorUnitario;

                await PedidoProduto.update(_pp, {where:{Id:_pp.Id}} );
                //todo: ver uma melhor forma de fazer essa atualização
                await this.RefreshPedido(req);
            }
        }
       
    }

    async AdicionarProduto(req, res, IdProduto){
        var pedido = this.ObterPedidoAtual(req);
        var produto = Produto.findByPk(IdProduto);
        var erro = false;

        await Promise.all([pedido, produto])
        .then(async (result)=>{
            pedido = result[0];
            produto = result[1];

            if(!produto)
                return;

            var pedidoProduto = pedido.PedidoProdutos.find(o => o.IdProduto == IdProduto); 
              
            if(pedidoProduto){
                var _pd = pedidoProduto.dataValues;
                _pd.Quantidade++;
                _pd.ValorUnitario = produto.Preco;
                _pd.ValorTotal = _pd.Quantidade * _pd.ValorUnitario;

                let res = await PedidoProduto.update(_pd, { where:{ Id: _pd.Id}});
                erro = res == null;
            }
            else
            {
                const obj = await PedidoProduto.create({
                    IdProduto: IdProduto,
                    Quantidade: 1,
                    IdPedido: pedido.Id,
                    ValorUnitario: produto?.Preco ?? 0,
                    ValorTotal: produto?.Preco ?? 0
                });
                erro = obj == null;
            }
            if(erro)
                req.session.Mensagem = new Mensagem(tipoMensagem.ERRO, 'Erro ao adicionar pedido.');

             //todo: ver uma melhor forma de fazer essa atualização
             await this.RefreshPedido(req);
        })
    }

    async ObterModalPedidosCliente(req, res)
    {
        new PedidoController().InicializarPedido(req, res)
        .then(async ()=>{
            var pedido = req.session.Pedido;
            //popula o produto quando a quantidade é maior que 0
            if(pedido?.PedidoProdutos)
            {
                for(var produtoPedido of pedido?.PedidoProdutos)
                {
                    if(produtoPedido.Quantidade > 0)
                    {
                        await Produto.findByPk(produtoPedido.IdProduto)
                        .then((produto)=>{
                            produtoPedido.Produto = produto;
                        })
                    }
                }
            }

            Render(req, res, Pages.PAGE_MODAL_PEDIDO_CLIENTE, {Pedido: req.session.Pedido, layout:false});
        })        
    }
    async RefreshPedido(req, res){
        await this.ObterPedidoAtual(req)
        .then(async (pedido)=> {
            //obtem valor total e quantidade de itens
            pedido.QuantidadeItens = pedido.PedidoProdutos.reduce((a, b) => a + b.Quantidade, 0);
            pedido.ValorTotal = pedido.PedidoProdutos.reduce((a, b) => a + b.ValorTotal, 0);

            req.session.Pedido = await pedido.save();
        })
    }
}

module.exports  = new PedidoController();
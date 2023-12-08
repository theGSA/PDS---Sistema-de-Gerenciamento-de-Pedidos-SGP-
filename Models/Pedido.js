const Sequelize = require('sequelize');
const db = require('../database/db');
const PedidoProduto = require('./PedidoProduto');
const Mesa = require('./Mesa');

const StatusPedido = {
    INCOMPLETO: 0, //cliente não confirmou
    PENDENTE: 1, //cliente confirmou
    EM_PREPARACAO: 2,//entregue a cozinha
    ENTREGUE: 3, //entregue ao cliente
    FINALIZADO: 4, //quando ja foi pago
}

const Pedido = db.define('Pedido',{
    Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    IdUsuario:{
        type: Sequelize.INTEGER,
    },
    IdMesa:{
        type:Sequelize.INTEGER,
    },
    QuantidadeItens:{
        type:Sequelize.INTEGER,
    },
    ValorTotal:{
        type: Sequelize.FLOAT
    },
    Status:{
        type: Sequelize.INTEGER,
        allowNull: false,
    }  
})
//estabelece uma relação entre Pedido e Mesa
Mesa.hasOne(Pedido, {
    foreignKey: 'IdMesa',
    sourceKey: 'Id'
})

Pedido.hasMany(PedidoProduto, {
    foreignKey: 'IdPedido',
    sourceKey: 'Id',
})


db.sync();

module.exports = {Pedido, StatusPedido};




const Sequelize = require('sequelize');
const db = require('../database/db');
const Pedido = require('./Pedido');


const PedidoProduto = db.define('PedidoProduto',{
    Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    IdProduto:{
        type: Sequelize.INTEGER
    },
    ValorUnitario:{
        type: Sequelize.FLOAT
    },
    ValorTotal: {
        type: Sequelize.FLOAT
    },
    Quantidade: {
        type:Sequelize.FLOAT
    },

})
// PedidoProduto.belongsTo(Pedido,{
//     foreignKey: 'IdPedido',
//     sourceKey: 'Id'
// })
db.sync();

module.exports = PedidoProduto;

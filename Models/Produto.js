
const Sequelize = require('sequelize');
const db = require('../database/db');
const Categoria = require('./Categoria');

const Produto = db.define('Produto',{
    Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    Nome: {
        type: Sequelize.STRING
    },
    Descricao:{
        type: Sequelize.STRING
    },
    Preco: {
        type: Sequelize.FLOAT
    }
})
Produto.belongsTo(Categoria,{
    foreignKey: 'IdCategoria',
    sourceKey: 'Id'
})
db.sync();

module.exports = Produto;

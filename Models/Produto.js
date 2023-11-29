
const Sequelize = require('sequelize');
const db = require('../database/db');
const Categoria = require('./Categoria');
const sequelize = require('../database/db');

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
    },
    Imagem:{
        type: Sequelize.BLOB
    },
    TipoImagem: {
        type: Sequelize.TEXT
    },
    NomeImagem : {
        type: Sequelize.TEXT
    }
})
Produto.belongsTo(Categoria,{
    foreignKey: 'IdCategoria',
    sourceKey: 'Id'
})
db.sync();

module.exports = Produto;

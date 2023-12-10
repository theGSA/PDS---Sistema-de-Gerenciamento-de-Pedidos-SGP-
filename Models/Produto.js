
const Sequelize = require('sequelize');
const db = require('../Database/db');
const Categoria = require('./Categoria');
const { BlobToBase64Content } = require("../Utils/Utils");

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
    Quantidade:{
        type: Sequelize.INTEGER
    },
    Imagem:{
        type: Sequelize.BLOB
    },
    TipoImagem: {
        type: Sequelize.TEXT
    },
    NomeImagem : {
        type: Sequelize.TEXT
    },
    Imagem64:{
        type: Sequelize.VIRTUAL,
        get:function(){
            return  this.Imagem ? `data:${this.TipoImagem};base64, ${BlobToBase64Content(this.Imagem)}`: null;
        }
    }
})
Produto.belongsTo(Categoria,{
    foreignKey: 'IdCategoria',
    sourceKey: 'Id'
})
db.sync();

module.exports = Produto;

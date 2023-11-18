
const Sequelize = require('sequelize')
const db = require('../database/db');


module.exports = db.define('Categoria',{
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
        type: Sequelize.STRING,
    }
})
db.sync();


const Sequelize = require('sequelize')
const db = require('../database/db');

const Usertype = {
    NAO_CADASTRADO: 1,
    CLIENTE: 2,
    FUNCIONARIO: 3,
}

const Usuario = db.define('Usuario',{
    Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    Nome: {
        type: Sequelize.STRING
    },
    Email:{
        type: Sequelize.STRING
    },
    Telefone: {
        type: Sequelize.STRING
    },
    Password:{
        type: Sequelize.STRING
    },
    Usertype:{
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})
db.sync();
module.exports = {Usuario, Usertype};
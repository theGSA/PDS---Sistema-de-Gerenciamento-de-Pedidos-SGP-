
const Sequelize = require('sequelize')
const db = require('../database/db');

const Usertype = {
    CADASTRADO: 1, 
    NAO_CADASTRADO: 2
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
    Password:{
        type: Sequelize.STRING
    },
    Usertype:{
        type: Sequelize.INTEGER
    }
})
db.sync();
module.exports = {Usuario, Usertype};
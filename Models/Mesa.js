
const Sequelize = require('sequelize');
const db = require('../Database/db');

const Mesa = db.define('Mesa',{
    Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    Numero: {
        type: Sequelize.INTEGER
    },
    Localizacao:{
        type: Sequelize.STRING
    },
    Cadeiras: {
        type: Sequelize.INTEGER
    }
})

db.sync();

module.exports = Mesa;

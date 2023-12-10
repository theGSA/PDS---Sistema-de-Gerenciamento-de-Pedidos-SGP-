const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  {
    dialect: 'sqlite',
    storage: './Database/db.sqlite',
    // logging: false,
    define:{
      timestamps: true,
      freezeTableName: true
    }
  }
)

module.exports = sequelize;
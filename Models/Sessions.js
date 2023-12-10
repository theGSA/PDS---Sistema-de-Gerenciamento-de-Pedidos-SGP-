
const Sequelize = require('sequelize');
const db = require('../Database/db');


const Sessions = db.define("Sessions", {
    sid: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    userId: Sequelize.STRING,
    expires: Sequelize.DATE,
    data: Sequelize.TEXT,
  });
db.sync();
module.exports = Sessions;


const Sequelize = require('sequelize');
const Session = require('../Config/Session');
const db = require('../database/db');


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

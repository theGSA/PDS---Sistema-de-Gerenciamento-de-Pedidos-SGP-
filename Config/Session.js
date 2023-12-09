const session = require('express-session');
const Security = require('../Utils/Security');
const sequelize = require('../Database/db');

var SequelizeStore = require("connect-session-sequelize")(session.Store);

module.exports = session({
    secret: Security.secret,
    resave: true,
    store: new SequelizeStore({
        db: sequelize
    }), 
    maxAge: 360000000,
    saveUninitialized: true
})


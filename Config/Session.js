const session = require('express-session');
const Security = require('../Utils/security');
const sequelize = require('../Database/db');
const Sessions = require('../Models/Sessions');

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


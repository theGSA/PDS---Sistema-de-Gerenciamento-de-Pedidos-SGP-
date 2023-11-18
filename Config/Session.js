const { MemoryStore } = require('express-session');
const session = require('express-session');
const Security = require('../Utils/security');

module.exports = session({
    secret: Security.secret,
    resave: true,
    store: new MemoryStore(), 
    maxAge: 360000000,
    saveUninitialized: true
})



module.exports = {
    isAuthenticated: function  (req, res, next) {
        global.routeName = req.path.split('/')[1].toLowerCase();
        // if(req.path == 'POST')
        //     return;
        let routName = req.originalUrl;

        if (req.session.user || req.method == 'POST' || ['login','Bootstraptest', 'cadastrar', 'auth', 'recuperarsenha'].includes(routeName)) 
            next('route')
        else 
            res.redirect('/Login');
    }
}
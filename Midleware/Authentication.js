
module.exports = {
    isAuthenticated: function  (req, res, next) {
        global.routeName = req.path.split('/')[1].toLowerCase();
        // if(req.path == 'POST')
        //     return;
        let routName = req.originalUrl;

        const bExclude = ['login','test','Bootstraptest', 'cadastrar', 'auth', 'recuperarsenha'].includes(routeName)

        if (req.session.user || req.method == 'POST' || bExclude ) 
            next('route')
        else 
            res.redirect('/Login');
    }
}
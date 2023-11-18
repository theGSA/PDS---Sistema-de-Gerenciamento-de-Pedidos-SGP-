
const Categoria = require('../Models/Categoria');

class CategoriaController{
    async Index(req, res){
        let Mensagem = req.session.Mensagem;
        req.session.Mensagem = null;
        
        const listaCategorias = await Categoria.findAll();
        
        res.render('Categoria', {Mensagem: Mensagem, Usuario:req.session.user, Categorias : listaCategorias});
    }
}

module.exports  = new CategoriaController();
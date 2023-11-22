const express = require('express');
const expressLayout = require('express-ejs-layouts');


const Authentication = require('./Midleware/Authentication');
const path = require('path');
const session = require('./Config/Session');
const {Usuario} = require('./Models/Usuario');

const LoginController = require('./Controllers/LoginController');
const AuthController = require('./Controllers/AuthController');
const HomeController = require('./Controllers/HomeController');
const ProdutoController = require('./Controllers/ProdutoController');
const CardapioController = require('./Controllers/CardapioController');
const CategoriaController = require('./Controllers/CategoriaController');

const app = express(); 

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(session);
app.use(Authentication.isAuthenticated);
app.use(function(req, res, next){
    global.active = req.path.split('/')[1] // [0] will be empty since routes start with '/'
    next();
});

app.set('view engine', 'ejs');
app.use(expressLayout);

app.get('/Login', LoginController.Index);
app.get('/Login/RecuperarSenha', LoginController.RecuperarSenha);
app.get('/Cadastrar', LoginController.Cadastrar)

//Cardápio
app.get('/Cardapio', CardapioController.Index);

app.get('/Produto', ProdutoController.Index);


app.post('/Auth', AuthController.Index);
app.post('/Auth/SemCadastro', AuthController.SemCadastro)
app.get('/Auth/Logout', AuthController.Logout)
app.post('/Auth/Cadastrar', AuthController.Cadastrar)

app.get('/Home', HomeController.Index);

app.get('/BootStrapTest', (req, res)=>{
    res.render('BootStrapTest', {Mensagem:null, Usuario:{}, layout:true});
})

//rotas get de categoria
app.get('/Categorias', CategoriaController.Index );
//categoria
app.post('/Categoria/GetEditModal', CategoriaController.PostGetEditModal);
app.post('/Categoria/GetDeleteModal', CategoriaController.PostGetDeleteModal);
app.post('/Categoria/Cadastrar', CategoriaController.PostCadastrar);
app.post('/Categoria/Deletar', CategoriaController.PostDeletar);

//rotas get de produto
app.get('/Produtos', ProdutoController.Index );
//produtos
app.post('/Produto/GetEditModal', ProdutoController.PostGetEditModal);
app.post('/Produto/GetDeleteModal', ProdutoController.PostGetDeleteModal);
app.post('/Produto/Cadastrar', ProdutoController.PostCadastrar);
app.post('/Produto/Deletar', ProdutoController.PostDeletar);

app.post('/', async (req, res)=>{
    const {Action} = req.body;

    if(Action == 'DeleteUsers')
    {
        const a  = await Usuario.destroy({where:{}})
        res.status(200).send({deletados: a});
    }
})

app.get("*",(req, res)=>{
    res.send('<h2>A pagina não existe amigão</h2>');
})

app.post("*",(req, res)=>{
    res.send('<h2>A pagina não existe amigão</h2>');
})

app.listen(3000, ()=>{
    console.log('Aplicação iniciada na porta 3000!');
})




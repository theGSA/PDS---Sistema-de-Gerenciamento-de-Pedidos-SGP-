const express = require('express');
const expressLayout = require('express-ejs-layouts');
const fileUpload = require('express-fileupload')

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
const ClienteController = require('./Controllers/ClienteController');
const Routes = require('./Config/Routes');
const Pages = require('./Config/Pages');

const app = express(); 

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(fileUpload());
app.use(session);
app.use(Authentication.isAuthenticated);
app.use(function(req, res, next){
    global.active = req.path.split('/')[1] // [0] will be empty since routes start with '/'
    next();
});

app.set('view engine', 'ejs');
app.use(expressLayout);

app.get(Routes.GET_LOGIN, LoginController.Index);
app.get(Routes.GET_LOGIN_RECUPERAR_SENHA, LoginController.RecuperarSenha);
app.get(Routes.GET_LOGIN_CADASTRAR, LoginController.Cadastrar)

//Cardápio
app.get('/', CardapioController.Index);
app.get(Routes.GET_CARDAPIO, CardapioController.Index);

app.post(Routes.POST_AUTH, AuthController.Index);
app.post(Routes.POST_AUTH_SEM_CADASTRO, AuthController.SemCadastro)
app.get(Routes.POST_AUTH_LOGOUT, AuthController.Logout)
app.post(Routes.POST_AUTH_CADASTRAR, AuthController.Cadastrar)

app.get(Routes.GET_HOME, HomeController.Index);

//rotas get de categoria
app.get(Routes.GET_CATEGORIAS, CategoriaController.Index );
//categoria
app.post('/Categoria/GetEditModal', CategoriaController.PostGetEditModal);
app.post('/Categoria/GetDeleteModal', CategoriaController.PostGetDeleteModal);
app.post('/Categoria/Cadastrar', CategoriaController.PostCadastrar);
app.post('/Categoria/Deletar', CategoriaController.PostDeletar);

//rotas get de produto
app.get(Routes.GET_PRODUTOS, ProdutoController.Index );
//produtos
app.post('/Produto/GetEditModal', ProdutoController.PostGetEditModal);
app.post('/Produto/GetDeleteModal', ProdutoController.PostGetDeleteModal);
app.post('/Produto/Cadastrar', ProdutoController.PostCadastrar);
app.post('/Produto/Deletar', ProdutoController.PostDeletar);

//rotas get de clientes
app.get(Routes.GET_CLIENTES, ClienteController.Index );
//clientes
app.post('/Cliente/GetEditModal', ClienteController.PostGetEditModal);
app.post('/Cliente/GetDeleteModal', ClienteController.PostGetDeleteModal);
app.post('/Cliente/Cadastrar', ClienteController.PostCadastrar);
app.post('/Cliente/Deletar', ClienteController.PostDeletar);


app.get('/test/GetEditModal', (req, res)=>{
    const {Id} = req.body;
        const cliente = null;//= await Usuario.findByPk(Id);
        
        const Usertype = [
            {Id:1, Descricao: 'Não cadastrado'},
            {Id:2, Descricao: 'Cliente'},
            {Id:3, Descricao: 'Funcionário'},
        ]

        res.render(Pages.PAGE_MODAL_CLIENTE, {Cliente: cliente,Usuario:null, Mensagem:null, Usertype:Usertype, layout: true});

});

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

app.listen(8081, ()=>{
    console.log('Aplicação iniciada na porta 3000!');
})




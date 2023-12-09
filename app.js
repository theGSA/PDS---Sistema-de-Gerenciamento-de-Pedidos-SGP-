const express = require('express');
const expressLayout = require('express-ejs-layouts');
const fileUpload = require('express-fileupload')

const Authentication = require('./Midleware/Authentication');
const path = require('path');
const session = require('./Config/Session');
const {Usuario, Usertype} = require('./Models/Usuario');

const LoginController = require('./Controllers/LoginController');
const AuthController = require('./Controllers/AuthController');
const HomeController = require('./Controllers/HomeController');
const ProdutoController = require('./Controllers/ProdutoController');
const CardapioController = require('./Controllers/CardapioController');
const CategoriaController = require('./Controllers/CategoriaController');
const ClienteController = require('./Controllers/ClienteController');
const Routes = require('./Config/Rotas');
const Pages = require('./Config/Pages');
const FuncionarioController = require('./Controllers/FuncionarioController');
const MesaController = require('./Controllers/MesaController');
const PageRouteRegister = require('./Controllers/PageRouteRegister');
const PedidoController = require('./Controllers/PedidoController');

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
global.Usertype = Usertype;

app.get(Routes.GET_LOGIN, LoginController.Index);
app.get(Routes.GET_LOGIN_RECUPERAR_SENHA, LoginController.RecuperarSenha);
app.get(Routes.GET_LOGIN_CADASTRAR, LoginController.Cadastrar)

//Cardápio
app.get('/', CardapioController.Index);
app.get(Routes.GET_CARDAPIO, CardapioController.Index);
app.post(Routes.GET_CARDAPIO, CardapioController.Cardapio);

app.post(Routes.POST_AUTH, AuthController.Index);
app.post(Routes.POST_AUTH_SEM_CADASTRO, AuthController.SemCadastro)
app.get(Routes.POST_AUTH_LOGOUT, AuthController.Logout)
app.post(Routes.POST_AUTH_CADASTRAR, AuthController.Cadastrar)
app.post(Routes.POST_AUTH_RECUPERAR_SENHA, AuthController.RecuperarSenha)


app.get(Routes.GET_HOME, HomeController.Index);

//Registra as rotas das paginas
PageRouteRegister.Register(app, Routes.GET_CLIENTE, ClienteController );
PageRouteRegister.Register(app, Routes.GET_FUNCIONARIO,  FuncionarioController);
PageRouteRegister.Register(app, Routes.GET_MESA, MesaController);
PageRouteRegister.Register(app, Routes.GET_PRODUTO, ProdutoController);
PageRouteRegister.Register(app, Routes.GET_CATEGORIA, CategoriaController);
PageRouteRegister.Register(app, Routes.GET_PEDIDO, PedidoController);


//
app.post(Routes.POST_CARDAPIO_LOGOUT, CardapioController.ObterModalQuestaoLogout);
app.post(Routes.POST_PEDIDO_MODAL_PEDIDO_CLIENTE, PedidoController.ObterModalPedidosCliente );

app.post('/', async (req, res)=>{
    const {Action} = req.body;
    if(Action == 'DeleteUsers')
    {
        const a  = await Usuario.destroy({where:{}})
        res.status(200).send({deletados: a});
    }
})

app.get("*",(req, res)=>{
    res.send('<h2>A página não existe!</h2>');
})

app.post("*",(req, res)=>{
    res.send('<h2>A página não existe!</h2>');
})

app.listen(8081, ()=>{
    console.log('Aplicação iniciada na porta 8081!');
})




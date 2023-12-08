

const Rotas = {
    
    GET_LOGIN:'/Login', 
    GET_LOGIN_RECUPERAR_SENHA:'/Login/RecuperarSenha', 
    GET_LOGIN_CADASTRAR: '/Cadastrar', 
    GET_HOME: '/Home',
    GET_CATEGORIA: '/Categoria',
    GET_PRODUTO: '/Produto',
    GET_CLIENTE: '/Cliente',
    GET_CARDAPIO: '/Cardapio',
    GET_FUNCIONARIO: '/Funcionario',
    GET_MESA: '/Mesa',

    GET_PEDIDO: '/Pedido',
    POST_PEDIDO_MODAL_PEDIDO_CLIENTE: '/Pedido/Pedidos',
    //post
    POST_AUTH: '/Auth',
    POST_AUTH_SEM_CADASTRO: '/Auth/SemCadastro',
    POST_AUTH_LOGOUT: '/Auth/Logout',
    POST_AUTH_CADASTRAR: '/Auth/Cadastrar',
    POST_AUTH_RECUPERAR_SENHA:  '/Auth/RecuperarSenha',
    //post categoria
    POST_CATEGORIA: '/Categorias',
    POST_CATEGORIA_CADASTRAR: '/Categoria/Cadastrar',
    POST_CATEGORIA_DELETAR: '/Categoria/Deletar',
    //post produto
    POST_PRODUTO: '/Produto',
    POST_PRODUTO_CADASTRAR: '/Produto/Cadastrar',
    POST_PRODUTO_DELETAR: '/Produto/Deletar',
    //cliente
    POST_CLIENTE: '/Clientes',
    POST_CLIENTE_CADASTRAR: '/Cliente/Cadastrar',
    POST_CLIENTE_DELETAR: '/Cliente/Deletar',
     //Funcionario
     POST_FUNCIONARIO: '/Funcionarios',
     POST_FUNCIONARIO_CADASTRAR: '/Funcionario/Cadastrar',
     POST_FUNCIONARIO_DELETAR: '/Funcionario/Deletar',

     //Mesas
     POST_MESA: '/Mesas',
     POST_MESA_CADASTRAR: '/Mesa/Cadastrar',
     POST_MESA_DELETAR: '/Mesa/Deletar',
     
     //Pedido
     POST_PEDIDO: '/Pedido',
     POST_PEDIDO_CADASTRAR: '/Pedido/Cadastrar',
     POST_PEDIDO_DELETAR: '/Pedido/Deletar',
     
     //cardapio
     POST_CARDAPIO: '/Cardapio',
     POST_CARDAPIO_LOGOUT : '/Cardapio/Logout',
    }
    
module.exports = Rotas;
global.Rotas = Rotas;


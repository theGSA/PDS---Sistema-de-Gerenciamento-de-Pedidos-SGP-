

module.exports = {
    
    GET_LOGIN:'/Login', 
    GET_LOGIN_RECUPERAR_SENHA:'/Login/RecuperarSenha', 
    GET_LOGIN_CADASTRAR: '/Cadastrar', 
    GET_HOME: '/Home',
    GET_CATEGORIAS: '/Categorias',
    GET_PRODUTOS: '/Produtos',
    GET_CLIENTES: '/Clientes',
    GET_CARDAPIO: '/Cardapio',

    //post
    POST_AUTH: '/Auth',
    POST_AUTH_SEM_CADASTRO: '/Auth/SemCadastro',
    POST_AUTH_LOGOUT: '/Auth/Logout',
    POST_AUTH_CADASTRAR: '/Auth/Cadastrar',
    
    //post categoria
    POST_CATEGORIA: '/Categorias',
    POST_CATEGORIA_CADASTRAR: '/Categoria/Cadastrar',
    POST_CATEGORIA_DELETAR: '/Categoria/Deletar',
    //post produto
    POST_PRODUTO: '/Produtos',
    POST_PRODUTO_CADASTRAR: '/Produto/Cadastrar',
    POST_PRODUTO_DELETAR: '/Produto/Deletar',
    //cliente
    POST_CLIENTE: '/Clientes',
    POST_CLIENTE_CADASTRAR: '/Cliente/Cadastrar',
    POST_CLIENTE_DELETAR: '/Cliente/Deletar'
}
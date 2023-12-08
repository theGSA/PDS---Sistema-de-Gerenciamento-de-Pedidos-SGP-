
class PageRouteRegister{
    Register(app, name, controller){
        app.get(name, controller.Index);

        app.post(`${name}/GetEditModal`, controller.PostGetEditModal);
        app.post(`${name}/GetDeleteModal`, controller.PostGetDeleteModal);
        app.post(`${name}/Cadastrar`, controller.PostCadastrar);
        app.post(`${name}/Deletar`, controller.PostDeletar);
    }
}

module.exports = new PageRouteRegister();
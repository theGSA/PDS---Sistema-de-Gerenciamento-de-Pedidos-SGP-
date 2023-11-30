

const Routes = require('../Config/Routes');
const Mesa = require('../Models/Mesa');
const { Mensagem, tipoMensagem } = require('../Models/Mensagem');

class MesaController{
    async Index(req, res){
        const listaMesas = await Mesa.findAll();
        
        res.render('Mesa', {Mesas : listaMesas});
    }


    async PostGetEditModal(req, res){
        const {Id} = req.body;
        const mesa = await Mesa.findByPk(Id);
    
        res.render('partials/ModalMesa', {Mesa: mesa, layout: false});
    }

    async PostGetDeleteModal(req, res){
        const {Id} = req.body;
        const mesa = await Mesa.findByPk(Id);
        mesa.Rota = 'Mesa/Deletar';
        res.render('partials/ModalDelete', {Model: mesa,  layout: false});
    }

    async PostCadastrar(req, res){
        const {Id} = req.body;

        var objRes = null;
        if(Id > 0)
            objRes = await Mesa.update(req.body, {where:{Id: Id}});
        else{
            req.body.Id = null;
            objRes = await Mesa.create(req.body);
        }
        if(objRes)
            req.session.Mensagem = new Mensagem(tipoMensagem.SUCCESS, 'Mesa atualizada com sucesso!');
        else
            req.session.Mensagem = new Mensagem(tipoMensagem.SUCCESS, 'Erro ao salvar mesa!');

        res.redirect(Routes.POST_MESA);
    }

    async PostDeletar(req, res){
        const {Id} = req.body;

        const objRes = await Mesa.destroy({where:{Id:Id}});
        if(objRes > 0)
            req.session.Mensagem = new Mensagem( tipoMensagem.SUCCESS, 'Mesa excluída!');
        else
            req.session.Mensagem = new Mensagem( tipoMensagem.ERRO, 'Erro ao excluir mesa!');

        res.redirect(Routes.GET_MESA);

    }
}

module.exports  = new MesaController();
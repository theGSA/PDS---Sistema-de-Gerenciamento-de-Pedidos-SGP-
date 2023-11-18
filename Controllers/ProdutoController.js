
class ProdutoController{
    async Index(req, res){
        let Mensagem = req.session.Mensagem;
        req.session.Mensagem = null;
        const lisProduto = [];
        for(var i = 0; i < 100; i++)
            {
                var produto={
                    id: i,
                    Nome: `nome_${i}`,
                    Descricao: `Essa é uma descrição do produto ${i}`,
                    Valor: 10.00
                }
                lisProduto.push(produto);
            }
        res.render('Produto', {Mensagem: Mensagem, Usuario:req.session.user, Produto:lisProduto});
    }
}

module.exports  = new ProdutoController();
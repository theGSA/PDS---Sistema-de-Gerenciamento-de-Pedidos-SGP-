
class CardapioController{
    async Index(req, res){
        let Mensagem = req.session.Mensagem;
        req.session.Mensagem = null;
        const listaProduto = [];
        const categorias = ["Carnes e Frangos", "Bebidas", "Saladas", "Peixes e Frutos do Mar", "Risotos", "Hamburgueres" ]
        const listaCategorias = []

        for(var j = 1; j < categorias.length; j++)
        {
            listaCategorias.push({
                Id : j,
                Nome: categorias.at(j-1)
            })
        }

        for(var i = 1; i < 10; i++)
            {
                var produto={
                    Id: i,
                    Nome: `nome_${i}`,
                    Descricao: `Essa é uma descrição do produto ${i}`,
                    Id_categoria: Math.round(Math.random() * 5 +1),
                    Valor: 10.00
                }
                listaProduto.push(produto);
            }
        res.render('Cardapio', {Mensagem: Mensagem, Usuario:req.session.user,Categorias : listaCategorias, Produtos:listaProduto});
    }
}

module.exports  = new CardapioController();
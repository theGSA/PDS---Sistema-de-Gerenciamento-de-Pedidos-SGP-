
    async function ShowModalByPost(ele, rota, itemID){
        ShowLoading();
        GetModalString(rota, itemID)
        .then((str)=>{
            ShowModal(str);
        })
        .catch(err=> console.log(err))
        .finally(()=>CloseLoading());

    }

    async function GetModalString(rota, itemID)
    {
        return await fetch(`/${rota}`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                Id: itemID,
            })
        })
        .then(T =>  T.text())
        .then(T =>{
            return T;
        })
        .catch(e =>{
            console.log('erro: '+e);
        }).finally(
        )
    }

    function ShowModal(T)
    {
        const doc = new DOMParser().parseFromString(T, 'text/html');
        const modal = doc.body.querySelector('*');

        document.body.appendChild(modal);
        var galleryModal = new bootstrap.Modal(modal, {
            keyboard: false
        });

        modal.addEventListener('hidden.bs.modal', el =>{
            document.body.removeChild(modal);
        })
        galleryModal.show();
    }

    const pageContent  = document.querySelector('#pageContent');
    const header  = document.querySelector('#header');
    const content = document.querySelector("#content");

    if(!Object.is(pageContent, null) && !Object.is(header, null) && !Object.is(content, null)){

        new ResizeObserver(() =>{
        content.style.height = `${(pageContent.clientHeight - header.clientHeight)}px `;
    }
    ).observe(header);
}

//dispara o para mostrar imagem quando busca no computador
function RefreshImage(element)
{
    const file = element.files[0]; 
    const ImgContainer = document.querySelector(element.dataset.showin);
    if(ImgContainer && element != null)
    {
        const reader = new FileReader();
        reader.onload = (e) => {
            ImgContainer.src = e.target.result;
            NomeImagem.value = imageInput.files[0].name;
        }
        reader.readAsDataURL(file);
    }
}

//Valida o número de telefone na tela de cadastro
const handlePhone = (event) => {
    let input = event.target
    input.value = phoneMask(input.value)
  }
  
  const phoneMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")
    return value
  }

  function mostrarSenha() {
    var x = document.getElementById("Password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  function ShowLoading()
  {
    const strHtml = `<div id="loading">
                        <img id="loading-image" src="./img/loading.gif" alt="carregando ..." />
                    </div>`

    const doc = new DOMParser().parseFromString(strHtml, 'text/html');
    const modal = doc.body.querySelector('*');

    if(!document.getElementById("loading"))
        document.body.appendChild(modal);

  }

  function CloseLoading()
  {
    const loading = document.getElementById('loading');
    if(loading)
        document.body.removeChild(loading);
  }


async function ExecutePostCardapio(acao, id)
{
    ShowLoading();
    await fetch('/Cardapio', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({    
            acao: acao,
            IdProduto: id,
        })
    })
    .then(data => data.json())
    .then(data => {
        for(var pedidoProduto of data.PedidoProdutos )
        {
            //atualizar os valores dos produtos do cardapio
            const elem = document.getElementsByName(`produto_${pedidoProduto.IdProduto}`);
            elem.forEach(el => el.innerHTML = pedidoProduto.Quantidade )
        }
        const elementoQuantidadeTotal = document.getElementById("PedidoQuantidadeTotal");
        console.log(elementoQuantidadeTotal);
        if(elementoQuantidadeTotal){
            console.log(data.QuantidadeItens);
            elementoQuantidadeTotal.innerHTML = data.QuantidadeItens;
            elementoQuantidadeTotal.style.visibility = data.QuantidadeItens == 0 ? 'hidden': 'visible';
        }
    })
    .finally(() => CloseLoading());
}

async function ExecutePostCardapioUpdateModalPedidoCliente(acao, id)
{
    ShowLoading();

    await ExecutePostCardapio(acao, id);

    await GetModalString('Pedido/Pedidos')
    .then(strHtml => {
        const doc = new DOMParser().parseFromString(strHtml, 'text/html');
        const current = document.querySelector('.modal-content');
        const currentScroll = current.querySelector('#modal-container-pedidos').scrollTop;

        const modal = doc.body.querySelector('.modal-content');
        current.innerHTML = modal.innerHTML;

        current.querySelector('#modal-container-pedidos').scrollTop = currentScroll;        

    })
    .finally(() => CloseLoading());
}

function AtualizaModoPagamento(tipoPagamento){
    ShowLoading();
    GetModalString('Pedido/AtualizarModoPagamento', tipoPagamento)
    .then(str={})
    .catch()
    .finally(()=> CloseLoading());
}

function ConfirmarPedido()
{
    ShowLoading();
    console.log("confirma o");
    GetModalString('Pedido/ConfirmarPedido')
    .then((str)=>{
        console.log(str);
        ShowModal(str);
    })
    .catch()
    .finally(()=> CloseLoading());
}

function ToReal(number)
{
    return number.toFixed(2).replace('.', ',');
}
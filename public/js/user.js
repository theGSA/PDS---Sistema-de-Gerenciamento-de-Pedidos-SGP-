
async function ShowModalByPost(ele, rota, itemID){
        if(ele) ele.disabled = true;

        fetch(`/${rota}`,{
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
            ShowModal(T);
            if(ele)  ele.disabled = false;
        })
        .catch(e =>{
            console.log('erro: '+e);
        })
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

    const header  = document.querySelector('#header');
    const pageContent  = document.querySelector('#pageContent');
    const content = document.querySelector("#content");

    if(!Object.is(pageContent, null) && !Object.is(header, null) && !Object.is(content, null)){

        new ResizeObserver(() =>{
        console.log( header.clientWidth + ' ' + header.clientHeight);
        console.log( pageContent.clientWidth + ' ' + pageContent.clientHeight);

        content.style.height = `${(pageContent.clientHeight - header.clientHeight)}px `;
        
        // content.style.overflowY = 'auto';
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
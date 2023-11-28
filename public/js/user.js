
async function ShowModalByPost(ele, rota, itemID){
    console.log(ele);
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
            console.log(T);
            ShowModal(T);
            if(ele)  ele.disabled = false;
        })
        .catch(e =>{
            console.log(e);
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

    new ResizeObserver(() =>{

        if(Object.is(pageContent, null) || Object.is(header, null) ||Object.is(content, null))
            return;

        console.log( header.clientWidth + ' ' + header.clientHeight);
        console.log( pageContent.clientWidth + ' ' + pageContent.clientHeight);

        content.style.height = `${(pageContent.clientHeight - header.clientHeight)}px `;
        
        // content.style.overflowY = 'auto';
    }
    ).observe(header);

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
        //const modalContainer = document.getElementById('ModalContainer');
        const doc = new DOMParser().parseFromString(T, 'text/html');
        const modal = doc.body.querySelector('*');

        //modalContainer.appendChild(modal);
        document.body.appendChild(modal);
        var galleryModal = new bootstrap.Modal(modal, {
            keyboard: false
        });

        modal.addEventListener('hidden.bs.modal', el =>{
            // modalContainer.innerHTML = '';
            document.body.removeChild(modal);
        })
        galleryModal.show();
    }
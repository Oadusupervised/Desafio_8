const formCargaProducts = document.querySelector("#cargaProducts");
if (formCargaProducts instanceof HTMLFormElement) {
    formCargaProducts.addEventListener("submit", async  (event) => {
      event.preventDefault();
      const inputId = document.querySelector('#inputId')
      const inputTitle = document.querySelector('#inputTitle')
      const inputDescription = document.querySelector('#inputDescription')
      const inputCode = document.querySelector('#inputCode')
      const inputPrice = document.querySelector('#inputPrice')
      const inputStock = document.querySelector('#inputStock')
      const inputCategory = document.querySelector('#inputCategory')
      const inputStatus = document.querySelector('#inputStatus')
      const inputThumbnails = document.querySelector('#inputThumbnails')
      if (
        inputId instanceof HTMLInputElement &&
        inputTitle instanceof HTMLInputElement &&
        inputDescription instanceof HTMLInputElement &&
        inputCode instanceof HTMLInputElement &&
        inputPrice instanceof HTMLInputElement&&
        inputStock instanceof HTMLInputElement &&
        inputCategory instanceof HTMLInputElement &&
        inputStatus instanceof HTMLInputElement &&
        inputThumbnails instanceof HTMLInputElement 
      ) {
  
        const datosUsuario = {
            Id: inputId.value,
            Title: inputTitle.value,
            Description: inputDescription.value,
            Code: inputCode.value,
            Price: inputPrice.value,
            Stock: inputStock.value,
            Category: inputCategory.value,
            Status: inputStatus.value,
            Thumbnails: inputThumbnails.value,
        }
  
        const usuarioCreado = await fetch('/api/realTimeProducts', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(datosUsuario)
        }).then(res => res.json())
  
        console.log(usuarioCreado)
      }
      console.log("nunca llegaron los datos")
    })
  }


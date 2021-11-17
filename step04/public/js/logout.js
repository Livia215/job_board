
window.addEventListener('load' , ()=>{

    document.querySelector('#logout').addEventListener("click", (e)=>{
        // document.que.value pour les variable
        e.preventDefault()
        // demande au serveure si il est good et si oui on remove sinon non 
        fetch("http://localhost:4000/logout").catch((error)=>{
            console.error(error)
            // attend de savoir si il y a eu une erreur
        }).then(data => data.json())
        // attend pour d'avoir le data et regarde si le token existe. si il existe il le remove sinon ca fait rien
        .then((data) => data.logout ? localStorage.removeItem('token') : '')
    
        
    })
})
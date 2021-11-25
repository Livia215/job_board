document.querySelector('.admin-submit').addEventListener("click", (e)=>{
    // document.que.value pour les variable
    e.preventDefault()
    const email= document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const body ={
        "email": email,
        "password": password
    }
    const option={
        method: "post",
        headers:{
            "Content-Type":"application/json",
            // "Authorization": "Bearer "+localStorage.getItem('token');
        },
        body:JSON.stringify(body)
    }
    fetch("http://localhost:4000/loginAdmin",option).then(data => data.json())
    .then((data) => {
        localStorage.setItem("token", data);
        console.log("coucou");
        let logoutButton = document.querySelector("#logout");
        logoutButton.classList.remove('hidden');
        logoutButton.classList.add('flex');
        location.replace("http://localhost:4000/")
    })
})
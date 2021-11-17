let buttonCandidate = document.querySelector('.candidate');
let buttonRecruiter = document.querySelector('.recruiter');
let formLoginUser = document.querySelector('#form-login-user');
let formLoginCompanie = document.querySelector('#form-login-companie');
let chooseTypeUser = document.querySelector('.choose-type-user');

buttonCandidate.addEventListener('click', () => {
    chooseTypeUser.classList.remove('flex');
    chooseTypeUser.classList.add('hidden');
    formLoginUser.classList.remove('hidden');
    formLoginUser.classList.add('flex');
})

buttonRecruiter.addEventListener('click', () => {
    chooseTypeUser.classList.remove('flex');
    chooseTypeUser.classList.add('hidden');
    formLoginCompanie.classList.remove('hidden');
    formLoginCompanie.classList.add('flex');
})

document.querySelector('.user-submit').addEventListener("click", (e)=>{
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
    fetch("http://localhost:4000/loginUsers",option).then(data => data.json())
    .then((data) => {
        let payload= jwtDecode(data);
        localStorage.setItem("token", data);
        let logoutButton = document.querySelector("#logout");
        logoutButton.classList.remove('hidden');
        logoutButton.classList.add('flex');
        
        location.replace("http://localhost:4000/")
    })
})


function jwtDecode (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
document.querySelector('#confirm-Psw').addEventListener('keyup', ()=>{
    setTimeout(validateUser, 200);
})
document.querySelector('.confirm-Psw-companie').addEventListener('keyup', ()=>{
    setTimeout(validateCompagnie, 200);
})

function validateUser(){
    let confirmPsw = document.querySelector('#confirm-Psw').value;
    let confirm = document.querySelector('#psw').value;

    if (confirmPsw === confirm && confirm!=="" && confirmPsw!=="") {
        document.querySelector('#confirmation').innerHTML="Both password are the same"
        document.querySelector('#confirmation').classList.remove("bad-psw")
        document.querySelector('#confirmation').classList.add("good-psw")
        document.querySelector('.button').disabled=false
    }else{
        document.querySelector('#confirmation').innerHTML="Both password is different"
        document.querySelector('#confirmation').classList.remove("good-psw")
        document.querySelector('#confirmation').classList.add("bad-psw")
        document.querySelector('.button').disabled=true
    }
}
function validateCompagnie(){
    let confirmPsw = document.querySelector('.confirm-Psw-companie').value;
    let confirm = document.querySelector('.psw-compagnie').value;

    if (confirmPsw === confirm && confirm!=="" && confirmPsw!=="") {
        document.querySelector('#confirmation_companie').innerHTML="Both password are the same"
        document.querySelector('#confirmation_companie').classList.remove("bad-psw")
        document.querySelector('#confirmation_companie').classList.add("good-psw")
        document.querySelector('.compagnie-submit').disabled=false
    }else{
        document.querySelector('#confirmation_companie').innerHTML="Both password is different"
        document.querySelector('#confirmation_companie').classList.remove("good-psw")
        document.querySelector('#confirmation_companie').classList.add("bad-psw")
        document.querySelector('.compagnie-submit').disabled=true
    }
}

document.querySelector('.user-submit').addEventListener('click', (e)=>{
    e.preventDefault()
    const first_name = document.querySelector('input[name="first_name"]').value
    const last_name = document.querySelector('input[name="last_name"]').value
    const phone = document.querySelector('input[name="phone"]').value
    const birthday = document.querySelector('input[name="birthday"]').value
    const user_desc = document.querySelector('.user-desc').value
    const email = document.querySelector('input[name="email"]').value
    const password = document.querySelector('input[name="password"]').value
    var body ={
        "first_name": first_name,
        "last_name": last_name,
        "phone": phone,
        "birthday": birthday,
        "user_desc": user_desc,
        "email": email,
        "password": password,
    }
    console.log(body);
    
    const option={
        method: "post",
        headers:{
            "Content-Type":"application/json",
            // "Authorization": "Bearer "+localStorage.getItem('token');
        },
        body:JSON.stringify(body)
    }
    fetch("http://localhost:4000/addUsers",option).then(data => data.json())
    .then((data) => {
        localStorage.setItem("token", data);

        location.replace("http://localhost:4000/")
    })
})

document.querySelector('.compagnie-submit').addEventListener('click', (e)=>{
    e.preventDefault()
    const compagnie_name = document.querySelector('input[name="companie_name"]').value
    const address = document.querySelector('input[name="adress"]').value
    const compagnie_desc = document.querySelector('.compagnie-desc').value
    const email = document.querySelector('input[name="compagnie-email"]').value
    const link = document.querySelector('input[name="link"]').value
    const password = document.querySelector('input[name="compagnie-password"]').value
    const siret = document.querySelector('input[name="siret"]').value
    var body ={
        "compagnie_name": compagnie_name,
        "address": address,
        "compagnie_desc": compagnie_desc,
        "email": email,
        "link": link,
        "password": password,
        "siret":siret
    }

    const option={
        method: "post",
        headers:{
            "Content-Type":"application/json",
            // "Authorization": "Bearer "+localStorage.getItem('token');
        },
        body:JSON.stringify(body)
    }
    fetch("http://localhost:4000/addCompagnies",option).then(data => data.json())
    .then((data) => {
        localStorage.setItem("token", data);

        location.replace("http://localhost:4000/")
    })
})


let buttonCandidate = document.querySelector('.candidate');
let buttonRecruiter = document.querySelector('.recruiter');
let formNewCandidate = document.querySelector('#form-new-candidate');
let formNewRecruiter = document.querySelector('#form-new-recruiter');
let chooseTypeUser = document.querySelector('.choose-type-user');

buttonCandidate.addEventListener('click', () => {
    chooseTypeUser.classList.remove('flex');
    chooseTypeUser.classList.add('hidden');
    formNewCandidate.classList.remove('hidden');
    formNewCandidate.classList.add('flex');
})

buttonRecruiter.addEventListener('click', () => {
    chooseTypeUser.classList.remove('flex');
    chooseTypeUser.classList.add('hidden');
    formNewRecruiter.classList.remove('hidden');
    formNewRecruiter.classList.add('flex');
})
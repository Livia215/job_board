document.querySelector('#confirm-Psw').addEventListener('keyup', ()=>{
    setTimeout(validate, 200);
})

function validate(){
    let confirmPsw = document.querySelector('#confirm-Psw').value;
    let confirm = document.querySelector('#psw').value;

    if (confirmPsw === confirm && confirm!=="" && confirmPsw!=="") {
        document.querySelector('#confirmation').innerHTML="Both password are the same"
        document.querySelector('#confirmation').classList.remove("bad-psw")
        document.querySelector('#confirmation').classList.add("good-psw")
        document.querySelector('.button').disabled=false
    }else{
        document.querySelector('#confirmation').innerHTML="Both password are different"
        document.querySelector('#confirmation').classList.remove("good-psw")
        document.querySelector('#confirmation').classList.add("bad-psw")
        document.querySelector('.button').disabled=true
    }
}

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
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
        document.querySelector('#confirmation').innerHTML="Both password is different"
        document.querySelector('#confirmation').classList.remove("good-psw")
        document.querySelector('#confirmation').classList.add("bad-psw")
        document.querySelector('.button').disabled=true
    }
}
let endDate = document.querySelector('#date_end');
let contract = document.querySelector('#contract');

contract.addEventListener('change', function(){
  let valeurselectionnee = contract.options[contract.selectedIndex].value;
  if (valeurselectionnee !== 'full-time') {
    endDate.classList.remove('hidden');
    endDate.classList.add('flex');
  } else {
    endDate.classList.add('hidden');
    endDate.classList.remove('flex');
  }
})

document.querySelector('.submit').addEventListener('click', (e)=>{
    e.preventDefault()
    const title = document.querySelector('input[name="title"]').value
    const short_desc = document.querySelectorAll('textarea')[0].value
    const long_desc = document.querySelectorAll('textarea')[1].value
    const contract = document.querySelectorAll('select')[0].value
    if (document.querySelector('input[name="wage"]').value) {
      var wage = document.querySelector('input[name="wage"]').value
    }else{
      var wage=null
    }
    if (document.querySelector('input[name="city"]').value) {
      var city = document.querySelector('input[name="city"]').value
    }else{
      var city=null
    }
    const domain = document.querySelectorAll('select')[1].value
    const date_start = document.querySelector('input[name="date_start"]').value
    if (document.querySelector('input[name="date_end"]').value) {
      var date_end = document.querySelector('input[name="date_end"]').value
    }else{
      var date_end=null
    }
    const current_date= Date.now()
    const compagnies_id=1
    
    const body ={
        "title": title,
        "short_desc": short_desc,
        "long_desc": long_desc,
        "contract": contract,
        "wage": wage,
        "city": city,
        "domain": domain,
        "date_start": date_start,
        "date_end": date_end,
        "current_date":current_date,
        "Compagnies_id": compagnies_id
    }
    const option={
        method: "post",
        headers:{
            "Content-Type":"application/json",
            // "Authorization": "Bearer "+localStorage.getItem('token');
        },
        body:JSON.stringify(body)
    }
    fetch("http://localhost:4000/addAdvetisement",option).then(data => data.json())
    .then((data) => {
       console.log("je suis dans le fetch");
        let payload= jwtDecode(data);
        localStorage.setItem("token", data);
    })
})




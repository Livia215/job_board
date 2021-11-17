
let buttonSearch = document.querySelector('#search');
let presentationSection = document.querySelector('#presentation-homepage');
let resultSearch = document.querySelector('#result-homepage');
let searchPart = document.querySelector('#search-homepage');
let buttonCloseForm = document.querySelector('#close-button');
let popupForm = document.querySelector('.form-popup');
let titleFormApply = document.querySelector('#intro-popup h2');

buttonSearch.addEventListener('click', function(){
  presentationSection.classList.add('hidden');
  presentationSection.classList.remove('flex');
  resultSearch.classList.remove('hidden');
  resultSearch.classList.add('flex');
  searchPart.classList.add('active')
})

buttonCloseForm.addEventListener('click', function(){
  popupForm.classList.remove('flex');
  popupForm.classList.add('hidden');
})

document.querySelector('.submit').addEventListener('click', (e)=>{
  e.preventDefault()
  // demande au serveure si il est good et si oui on remove sinon non 
  const option={
    method: "post",
    headers:{
        "Content-Type":"application/json",
        // "Authorization": "Bearer "+localStorage.getItem('token');
    },
  }
  fetch("http://localhost:4000/displayAdvertisements",option).then(data => data.json())
  .then((data) => {
      let payload= JSON.stringify(jwtDecode(data));
      localStorage.setItem("advertisements", payload);
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
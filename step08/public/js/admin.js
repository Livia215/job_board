let buttonAdminUsers = document.querySelector('#button-users');
let buttonAdminCompanies = document.querySelector('#button-companies');
let buttonAdminAdvertisements = document.querySelector('#button-advertisements');



buttonAdminUsers.addEventListener('click', () => {
  closeAllContent();
  document.querySelector('#content-users').classList.remove('hidden');
  document.querySelector('#content-users').classList.add('flex');
})

buttonAdminCompanies.addEventListener('click', () => {
  closeAllContent();
  document.querySelector('#content-companies').classList.remove('hidden');
  document.querySelector('#content-companies').classList.add('flex');
})

buttonAdminAdvertisements.addEventListener('click', () => {
  closeAllContent();
  document.querySelector('#content-advertisements').classList.remove('hidden');
  document.querySelector('#content-advertisements').classList.add('flex');
})

function closeAllContent() {
  let content = document.querySelectorAll('.data-content');
  for (let item of content) {
    if (item.classList.contains("flex")){
      item.classList.remove('flex');
      item.classList.add('hidden');
    }
  }
}

document.querySelector('#close-button-user').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.form-update-user').classList.remove('flex');
  document.querySelector('.form-update-user').classList.add('hidden');
  document.querySelector('.content-form-update-user').innerHTML = ``
})

function jwtDecode (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

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
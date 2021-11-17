let buttonSearch = document.querySelector('#search');
let presentationSection = document.querySelector('#presentation-homepage');
let resultSearch = document.querySelector('#result-homepage');
let searchPart = document.querySelector('#search-homepage');

buttonSearch.addEventListener('click', function(){
  presentationSection.classList.add('hidden');
  presentationSection.classList.remove('flex');
  resultSearch.classList.remove('hidden');
  resultSearch.classList.add('flex');
  searchPart.classList.add('active')
})
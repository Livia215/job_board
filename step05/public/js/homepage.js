let buttonSearch = document.querySelector('#search');
let presentationSection = document.querySelector('#presentation-homepage');
let resultSearch = document.querySelector('#result-homepage');
let searchPart = document.querySelector('#search-homepage');
let buttonLearnMore = document.getElementsByClassName('learn-more');
let buttonReduce = document.getElementsByClassName('reduce');
let numAdvertisement = buttonLearnMore.length;
let buttonApply = document.querySelectorAll('.apply-button');
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

function openDetails(element) {
  closeAllAdvertisements();
  toggleAdvertisement(element);
  let buttonReduce = element.target.parentElement.querySelector('.reduce');
  buttonReduce.classList.remove('hidden');
  buttonReduce.classList.add('flex');
}

function closeDetails(element) {
  toggleAdvertisement(element);
  let buttonLearnMore = element.target.parentElement.querySelector('.learn-more');
  buttonLearnMore.classList.remove('hidden');
  buttonLearnMore.classList.add('flex');
}

function closeAllAdvertisements() {
  let cards = document.getElementsByClassName('content-result-homepage');
  for (let item of cards) {
    if (item.querySelector('.long-description-advertisement').classList.contains("flex") && item.querySelector('.short-description-advertisement').classList.contains("hidden")) {
      item.querySelector('.long-description-advertisement').classList.remove('flex');
      item.querySelector('.long-description-advertisement').classList.add('hidden');
      item.querySelector('.short-description-advertisement').classList.remove('hidden');
      item.querySelector('.short-description-advertisement').classList.add('flex');
      item.querySelector('.reduce').classList.remove('flex');
      item.querySelector('.reduce').classList.add('hidden');
      item.querySelector('.learn-more').classList.add('flex');
      item.querySelector('.learn-more').classList.remove('hidden');
    }
  }
}

function toggleAdvertisement(element) {
  let parentOfSelected = element.target.parentElement;
  let longDescription = parentOfSelected.querySelector('.long-description-advertisement');
  let shortDescription = parentOfSelected.querySelector('.short-description-advertisement');
  longDescription.classList.toggle('hidden');
  longDescription.classList.toggle('flex');
  shortDescription.classList.toggle('hidden');
  shortDescription.classList.toggle('flex');
  element.target.classList.toggle('flex');
  element.target.classList.toggle('hidden');
} 

function openApplyForm(element) {
  let parentOfSelected = element.target.parentElement.parentElement.parentElement.querySelector('.intro-advertisement div h2').innerHTML;
  titleFormApply.innerHTML = parentOfSelected;
  popupForm.classList.remove('hidden');
  popupForm.classList.add('flex');
}

for (var i = 0; i < numAdvertisement; i++) {
  buttonLearnMore[i].addEventListener('click', openDetails, false);
  buttonReduce[i].addEventListener('click', closeDetails, false);
  buttonApply[i].addEventListener('click', openApplyForm, false);
}

buttonCloseForm.addEventListener('click', function(){
  popupForm.classList.remove('flex');
  popupForm.classList.add('hidden');
})
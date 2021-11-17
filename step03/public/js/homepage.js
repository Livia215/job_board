let buttonSearch = document.querySelector('#search');
let presentationSection = document.querySelector('#presentation-homepage');
let resultSearch = document.querySelector('#result-homepage');
let searchPart = document.querySelector('#search-homepage');
let buttonLearnMore = document.getElementsByClassName('learn-more');
let buttonReduce = document.getElementsByClassName('reduce');
let numAdvertisement = buttonLearnMore.length;

buttonSearch.addEventListener('click', function(){
  presentationSection.classList.add('hidden');
  presentationSection.classList.remove('flex');
  resultSearch.classList.remove('hidden');
  resultSearch.classList.add('flex');
  searchPart.classList.add('active')
})

function openDetails(element) {
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
  let parentOfSelected = element.target.parentElement;
  let longDescription = parentOfSelected.querySelector('.long-description-advertisement');
  let shortDescription = parentOfSelected.querySelector('.short-description-advertisement');
  let buttonReduce = parentOfSelected.querySelector('.reduce');
  longDescription.classList.remove('hidden');
  longDescription.classList.add('flex');
  shortDescription.classList.add('hidden');
  shortDescription.classList.remove('flex');
  element.target.classList.remove('flex');
  element.target.classList.add('hidden');
  buttonReduce.classList.remove('hidden');
  buttonReduce.classList.add('flex');
}

function closeDetails(element) {
  let buttonLearnMore = element.target.parentElement.querySelector('.learn-more');
  let parentOfSelected = element.target.parentElement;
  let longDescription = parentOfSelected.querySelector('.long-description-advertisement');
  let shortDescription = parentOfSelected.querySelector('.short-description-advertisement');
  longDescription.classList.add('hidden');
  longDescription.classList.remove('flex');
  shortDescription.classList.remove('hidden');
  shortDescription.classList.add('flex');
  element.target.classList.remove('flex');
  element.target.classList.add('hidden');
  buttonLearnMore.classList.remove('hidden');
  buttonLearnMore.classList.add('flex');
}

for (var i = 0; i < numAdvertisement; i++) {
  buttonLearnMore[i].addEventListener('click', openDetails, false);
}

for (var i = 0; i < numAdvertisement; i++) {
  buttonReduce[i].addEventListener('click', closeDetails, false);
}
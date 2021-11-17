let resultHomePage = document.querySelector('#result-homepage');
let array = [1,3,2,2,2]

buttonSearch.addEventListener('click', () => {
  for (let index = 0; index < array.length; index++) {
    resultHomePage.innerHTML += `
    <div class="content-result-homepage">
      <div class="intro-advertisement flex">
          <div>
              <h2>Développeur Back Symfony H/F</h2>
              <h3>Santé Académie</h3>
          </div>
          <div>
              <div class="icon-text-result flex">
                  <img src="https://res.cloudinary.com/dxzrvtzyt/image/upload/v1632899972/JobBoard/medal_lwpqqc.svg" alt="Badge">
                  <p>Full-Time</p>
              </div>
              <div class="icon-text-result flex">
                  <img src="https://res.cloudinary.com/dxzrvtzyt/image/upload/v1632899972/JobBoard/clock_ksdt22.svg" alt="Time">
                  <p>1 day ago</p>
              </div>
          </div>
      </div>
      <div class="informations-advertisement flex">
          <div class="icon-text-result flex">
              <img src="https://res.cloudinary.com/dxzrvtzyt/image/upload/v1632899972/JobBoard/map-locator_zwfylc.svg" alt="Place">
              <p>69002 Lyon</p>
          </div>
          <div class="icon-text-result flex">
              <img src="https://res.cloudinary.com/dxzrvtzyt/image/upload/v1632899972/JobBoard/bill_fb2a1k.svg" alt="Money">
              <p>60 000 per year</p>
          </div>
          <div class="icon-text-result flex">
              <img src="https://res.cloudinary.com/dxzrvtzyt/image/upload/v1632899972/JobBoard/tools_xnjcbx.svg" alt="Tools">
              <p>Health</p>
          </div>
      </div>
      <div class="short-description-advertisement flex">
          <p>Lorem ipsum.</p>
      </div>
      <div class="long-description-advertisement hidden">
          <div class="intro-description-advertisement flex">
              <h4>Job Description</h4>
              <button class="apply-button">Apply</button>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aut nihil nostrum dolore nulla, necessitatibus laboriosam dolores, numquam itaque maiores voluptates nemo doloremque recusandae sequi atque eum ad magni nesciunt.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aut nihil nostrum dolore nulla, necessitatibus laboriosam dolores, numquam itaque maiores voluptates nemo doloremque recusandae sequi atque eum ad magni nesciunt.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aut nihil nostrum dolore nulla, necessitatibus laboriosam dolores, numquam itaque maiores voluptates nemo doloremque recusandae sequi atque eum ad magni nesciunt.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aut nihil nostrum dolore nulla, necessitatibus laboriosam dolores, numquam itaque maiores voluptates nemo doloremque recusandae sequi atque eum ad magni nesciunt.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aut nihil nostrum dolore nulla, necessitatibus laboriosam dolores, numquam itaque maiores voluptates nemo doloremque recusandae sequi atque eum ad magni nesciunt.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aut nihil nostrum dolore nulla, necessitatibus laboriosam dolores, numquam itaque maiores voluptates nemo doloremque recusandae sequi atque eum ad magni nesciunt.</p>
      </div>
      <button class="learn-more flex" href="#">Learn more</button>
      <button class="reduce hidden" href="#">Reduce</button>
    </div>
    `
  }

    let buttonLearnMore = document.getElementsByClassName('learn-more');
    let buttonReduce = document.getElementsByClassName('reduce');
    let numAdvertisement = buttonLearnMore.length;
    let buttonApply = document.querySelectorAll('.apply-button');
    
    for (var i = 0; i < numAdvertisement; i++) {
    buttonLearnMore[i].addEventListener('click', openDetails, false);
    buttonReduce[i].addEventListener('click', closeDetails, false);
    buttonApply[i].addEventListener('click', openApplyForm, false);
    }
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
    if (localStorage.getItem("token")){
        const token = localStorage.getItem("token");
        const data = jwtDecode(token);
        popupForm.querySelector("#name").value = data.first_name + " " + data.last_name;
        popupForm.querySelector("#phone").value = data.phone;
        popupForm.querySelector("#email").value = data.email;
    } else {
        popupForm.querySelector("#name").value = null;
        popupForm.querySelector("#phone").value = null;
        popupForm.querySelector("#email").value = null;
    }
}

function jwtDecode (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  };
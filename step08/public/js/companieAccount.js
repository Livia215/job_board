let formUpdateProfileCompanie = document.querySelector('.form-profile-companie-account');

window.addEventListener('load', () => {
  let user = jwtDecode(localStorage.getItem('token'))
  if (user.role === "compagnie"){
    showProfileCompanie();
    showAdvertisementPosted();
  } else {
    window.location.href = '/login';
  }
})

function showProfileCompanie() {
  const companie = jwtDecode(localStorage.getItem('token'));
  formUpdateProfileCompanie.innerHTML = `
  <label for="companie_name">Name of your companie</label>
  <input type="text" required name="companie_name" placeholder="Companie name" value="${companie.compagnie_name}">
  <label for="address">Address of the companie</label>
  <input type="text" name="address" placeholder="Address" value="${companie.address}" required>
  <label for="companie_desc">Description of your companie</label>
  <textarea name="description" class="compagnie_desc" placeholder="decription about your companie" value="${companie.companie_desc}" cols="30" rows="10"></textarea>
  <label for="link">Link to your website</label>
  <input type="url" name="link" placeholder="Link to yout website" value="${companie.link}">
  <input type="hidden" name="id" value="${companie.id}">
  `
}

const profileUpdate = document.querySelector('.update-account-companie')
profileUpdate.addEventListener('click', (e)=>{
    e.preventDefault();
    const id = formUpdateProfileCompanie.querySelector('input[name="id"]').value
    const companie_name = formUpdateProfileCompanie.querySelector('input[name="companie_name"]').value
    const address = formUpdateProfileCompanie.querySelector('input[name="address"]').value
    const companie_desc = formUpdateProfileCompanie.querySelector('textarea').value
    const link = formUpdateProfileCompanie.querySelector('input[name="link"]').value
    var body = {
      "id": id,
      "companie_name": companie_name,
      "address": address,
      "companie_desc": companie_desc,
      "link": link,
    }
})
window.addEventListener('load', ()=>{
  const companie = jwtDecode(localStorage.getItem('token'));

  const body = {
    "id": companie.id
  }
  const option={
    method: "post",
    headers:{
        "Content-Type":"application/json",
        // "Authorization": "Bearer "+localStorage.getItem('token');
    },
    body:JSON.stringify(body)
  }
  fetch("http://localhost:4000/displayAdvertisementsCompanies",option).then(data => data.json())
  .then((data) => {
      jwtDecode(data);
      showAdvertisementPosted(jwtDecode(data))
  })
})


function showAdvertisementPosted(advertisements) {
  advertisements.forEach(advertisement => {
    document.querySelector('.list-advertisement-companie-posted').innerHTML += `
  <div class="advertisement-user-apply">
          <div class="intro-advertisement flex">
              <div>
                  <h2>${advertisement.title}</h2>
                  <h3>${advertisement.compagnies_name}</h3>
              </div>
              <div>
                  <div class="icon-text-result flex">
                      <img src="https://res.cloudinary.com/dxzrvtzyt/image/upload/v1632899972/JobBoard/medal_lwpqqc.svg" alt="Badge">
                      <p>${advertisement.contract}</p>
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
                  <p>${advertisement.city}</p>
              </div>
              <div class="icon-text-result flex">
                  <img src="https://res.cloudinary.com/dxzrvtzyt/image/upload/v1632899972/JobBoard/bill_fb2a1k.svg" alt="Money">
                  <p>${advertisement.wage}€ per year</p>
              </div>
              <div class="icon-text-result flex">
                  <img src="https://res.cloudinary.com/dxzrvtzyt/image/upload/v1632899972/JobBoard/tools_xnjcbx.svg" alt="Tools">
                  <p>${advertisement.domain}</p>
              </div>
          </div>
          <div class="short-description-advertisement flex">
              <p>${advertisement.short_desc}</p>
          </div>
        </div>`
  });
}

function jwtDecode (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};
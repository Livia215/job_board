let formUpdateProfileUser = document.querySelector('.form-profile-user-account');

window.addEventListener('load', () => {
  let user = jwtDecode(localStorage.getItem('token'))
  if (user.role === "user"){
    showProfileUser();
    showAdvertisementUserApplyFor();
  } else {
    window.location.href = '/login';
  }
})

function showProfileUser() {
  const user = jwtDecode(localStorage.getItem('token'));
  formUpdateProfileUser.innerHTML = `
  <label for="first_name">First name</label>
  <input
  type="text"
  required
  name="first_name"
  placeholder="First name"
  value="${user.first_name}"
  />
  <label for="last_name">Last name</label>
  <input
    type="text"
    required
    name="last_name"
    placeholder="Last name"
    value="${user.last_name}"
  />
  </div>
  <label for="phone">Phone</label>
  <input type="number" name="phone" placeholder="Phone number" value="${user.phone}" />
  <label for="description">Description</label>
  <textarea
    name="description"
    class="description"
    placeholder="Description"
    value="${user.desc_user}"
    cols="30"
    rows="10"
  ></textarea>
  <input type="hidden" name="id" value="${user.id}"></input>
  `
}

const profileUpdate = document.querySelector('.update-account-user')
profileUpdate.addEventListener('click', (e)=>{
  e.preventDefault();
  const id = formUpdateProfileUser.querySelector('input[name="id"]').value
  const first_name = formUpdateProfileUser.querySelector('input[name="first_name"]').value
  const last_name = formUpdateProfileUser.querySelector('input[name="last_name"]').value
  const phone = formUpdateProfileUser.querySelector('input[name="phone"]').value
  const user_desc = formUpdateProfileUser.querySelector('textarea').value
  var body = {
    "id": id,
    "first_name": first_name,
    "last_name": last_name,
    "phone": phone,
    "user_desc": user_desc,
  }
})

window.addEventListener('load', ()=>{
  const user = jwtDecode(localStorage.getItem('token'));

  const body = {
    "email": user.email
  }
  const option={
    method: "post",
    headers:{
        "Content-Type":"application/json",
        // "Authorization": "Bearer "+localStorage.getItem('token');
    },
    body:JSON.stringify(body)
  }
  fetch("http://localhost:4000/displayAdvertisementsUsers",option).then(data => data.json())
  .then((data) => {
      jwtDecode(data);
      showAdvertisementUserApplyFor((jwtDecode(data)))
  })
})

function showAdvertisementUserApplyFor(advertisements) {
  advertisements.forEach(advertisement => {
    document.querySelector('.list-advertisement-user-apply').innerHTML += `
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
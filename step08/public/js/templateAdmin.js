let tableUsers = document.querySelector('#content-users tbody');
let tableCompanies = document.querySelector('#content-companies tbody');
let tableAdvertisements = document.querySelector('#content-advertisements tbody');
let array = [1,2,3,4,5]

window.addEventListener('load', () => {
  localStorage.removeItem('advertisementss')
  // demande au serveure si il est good et si oui on remove sinon non 
  const option={
    method: "post",
    headers:{
        "Content-Type":"application/json",
        // "Authorization": "Bearer "+localStorage.getItem('token');
    },
  }
  fetch("http://localhost:4000/adminUsers",option).then(data => data.json())
  .then((data) => {
    let payload= JSON.stringify(jwtDecode(data));
    localStorage.setItem("users", payload);
  })
  fetch("http://localhost:4000/adminCompagnies",option).then(data => data.json())
  .then((data) => {
    let payload= JSON.stringify(jwtDecode(data));
    localStorage.setItem("compagnies", payload);
  })
  fetch("http://localhost:4000/adminAdvertisement",option).then(data => data.json())
  .then((data) => {
    let payload= JSON.stringify(jwtDecode(data));
    localStorage.setItem("advertisements", payload);
  })
  const users = JSON.parse(localStorage.getItem('users'))
  users.forEach(user => {
    tableUsers.innerHTML += `
    <tr>
      <td>${user.first_name}</td>
      <td>${user.last_name}</td>
      <td class="user-email">${user.email}</td>
      <td>${user.role}</td>
      <td class="table-col-settings flex">
        <button class="button-settings-user">
          <img src="https://res.cloudinary.com/dxzrvtzyt/image/upload/v1634220476/JobBoard/setting_nhcek5.png" alt="Settings" width="20">
        </button>
        <button class="button-delete-user">
          <img src="https://res.cloudinary.com/dxzrvtzyt/image/upload/v1634220495/JobBoard/bin_onxcad.png" alt="Settings" width="20">
          </button>
          <input type="hidden" name="id-user" value="${user.id}">
      </td>
    </tr>
    `;
    
  });
  let buttonSettingUser = document.getElementsByClassName('button-settings-user');
  let numUsers = buttonSettingUser.length;


  for (var i = 0; i < numUsers; i++) {
    buttonSettingUser[i].addEventListener('click', openSettingsUser, false);
    // buttonDeleteUser[i].addEventListener('click', 1, false);
  }
  const compagnies = JSON.parse(localStorage.getItem('compagnies'));

  compagnies.forEach(compagnie => {
    tableCompanies.innerHTML += `
    <tr>
      <td>${compagnie.compagnie_name}</td>
      <td>${compagnie.address}</td>
      <td class="companie-email">${compagnie.email}</td>
      <td class="table-col-settings flex">
        <button class="button-settings-companie">
          <img src="https://res.cloudinary.com/dxzrvtzyt/image/upload/v1634220476/JobBoard/setting_nhcek5.png" alt="Settings" width="20">
        </button>

        <button class="button-delete-companie">
          <img src="https://res.cloudinary.com/dxzrvtzyt/image/upload/v1634220495/JobBoard/bin_onxcad.png" alt="Settings" width="20">
          <input type="hidden" name="id-companie" value="${compagnie.id}">
        </button>
      </td>
    </tr>
    `;
  });
  let buttonSettingsCompanie = document.getElementsByClassName('button-settings-companie');
  let numCompanies = buttonSettingsCompanie.length;

  for (var i = 0; i < numCompanies; i++) {
    buttonSettingsCompanie[i].addEventListener('click', openSettingsCompanie, false);
  }

  let advertisements = JSON.parse(localStorage.getItem('advertisements'))
  advertisements.forEach(advertisement => {
    tableAdvertisements.innerHTML += `
    <tr>
      <td>${advertisement.compagnie_name}</td>
      <td>${advertisement.title}</td>
      <td>${advertisement.domain}</td>
      <td>${advertisement.contract}</td>
      <td>${advertisement.created_at}</td>
      <td>
      <button class="button-delete-advertisements">
        <img src="https://res.cloudinary.com/dxzrvtzyt/image/upload/v1634220495/JobBoard/bin_onxcad.png" alt="Settings" width="20">
        </button>
        <input type="hidden" name="id-companie" value="${advertisement.id}">
      </td>
    </tr>
    `;
  });

  function openSettingsUser(element){
    let formUpdateUser = document.querySelector('.form-update-user');
    formUpdateUser.classList.remove('hidden');
    formUpdateUser.classList.add('flex');
    let elementSelected = element.target.parentElement.parentElement.parentElement.querySelector('.user-email').textContent; 
    users.forEach(e => {
      if (elementSelected === e.email){
        document.querySelector('.content-form-update-user').innerHTML = `
        <div class="flex bloc-row">
          <input
            type="text"
            required
            name="first_name"
            placeholder="First name"
            value="${e.first_name}"
          />
          <input
            type="text"
            required
            name="last_name"
            placeholder="Last name"
            value="${e.last_name}"
          />
        </div>
        <input type="number" name="phone" placeholder="Phone number" value="${e.phone}" />
        <textarea
          name="description"
          class="description"
          placeholder="Description"
          value="${e.desc_user}"
          cols="30"
          rows="10"
        ></textarea>
        <select name="role">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <input type="hidden" name="id" value="${e.id}">
        `
      }

    });
  }

  const userSubmits = document.querySelector('.update-submit-user')
  userSubmits.addEventListener('click', (e)=>{
    e.preventDefault();
    let contentFormUpdateUser = document.querySelector('.content-form-update-user');
    const id = contentFormUpdateUser.querySelector('input[name="id"]').value
    const first_name = contentFormUpdateUser.querySelector('input[name="first_name"]').value
    const last_name = contentFormUpdateUser.querySelector('input[name="last_name"]').value
    const phone = contentFormUpdateUser.querySelector('input[name="phone"]').value
    const role = contentFormUpdateUser.querySelector('select').value
    const user_desc = contentFormUpdateUser.querySelector('textarea').value
    var body = {
      "id": id,
      "first_name": first_name,
      "last_name": last_name,
      "phone": phone,
      "role": role,
      "user_desc": user_desc,
    }
    const option={
        method: "post",
        headers:{
            "Content-Type":"application/json",
            // "Authorization": "Bearer "+localStorage.getItem('token');
        },
        body:JSON.stringify(body)
    }
    fetch("http://localhost:4000/updateUsers",option).then((data) => {
      console.log(data);
      fetch("http://localhost:4000/adminUsers",option).then(data => data.json())
      .then((data) => {
        let payload= JSON.stringify(jwtDecode(data));
        localStorage.setItem("users", payload);
        location.replace("http://localhost:4000/dashboard")
      })
    })
  })

  const buttonDeleteUsers= document.querySelectorAll('.button-delete-user')
  buttonDeleteUsers.forEach(buttonDeleteUser => {
    buttonDeleteUser.addEventListener('click', (e)=>{
      const id = e.target.parentElement.nextElementSibling.value;
      const body ={
          "id": id,
      }
      const option={
          method: "post",
          headers:{
              "Content-Type":"application/json",
              // "Authorization": "Bearer "+localStorage.getItem('token');
          },
          body:JSON.stringify(body)
      }
      fetch("http://localhost:4000/deleteUsers",option).then(data => data.json())
      .then((data) => {
        fetch("http://localhost:4000/adminUsers",option).then(data => data.json())
        .then((data) => {
          let payload= JSON.stringify(jwtDecode(data));
          localStorage.setItem("users", payload);
          location.replace("http://localhost:4000/admin")
        })
      })
    })
  });
  const buttonDeleteCompanies= document.querySelectorAll('.button-delete-companie')
  buttonDeleteCompanies.forEach(buttonDeletecompanie => {
    buttonDeletecompanie.addEventListener('click', (e)=>{
      const id = e.target.parentElement.nextElementSibling.value;
      const body ={
          "id": id,
      }
      const option={
          method: "post",
          headers:{
              "Content-Type":"application/json",
              // "Authorization": "Bearer "+localStorage.getItem('token');
          },
          body:JSON.stringify(body)
      }
      fetch("http://localhost:4000/deleteCompagnies",option).then(data => data.json())
      .then((data) => {
        fetch("http://localhost:4000/adminCompagnies",option).then(data => data.json())
        .then((data) => {
          let payload= JSON.stringify(jwtDecode(data));
          localStorage.setItem("users", payload);
          location.replace("http://localhost:4000/dashboard")
        })
      })
    })
  });
  const buttonDeleteAdvertisements= document.querySelectorAll('.button-delete-advertisements')
  buttonDeleteAdvertisements.forEach(buttonDeleteAdvertisement => {
    buttonDeleteAdvertisement.addEventListener('click', (e)=>{
      const id = e.target.parentElement.nextElementSibling.value;
      const body ={
          "id": id,
      }
      const option={
          method: "post",
          headers:{
              "Content-Type":"application/json",
              // "Authorization": "Bearer "+localStorage.getItem('token');
          },
          body:JSON.stringify(body)
      }
      fetch("http://localhost:4000/deleteAdvertisements",option).then(data => data.json())
      .then((data) => {
        fetch("http://localhost:4000/adminAdvertisement",option).then(data => data.json())
        .then((data) => {
          let payload= JSON.stringify(jwtDecode(data));
          localStorage.setItem("users", payload);
          location.replace("http://localhost:4000/dashboard")
        })
      })
    })
  });

  function openSettingsCompanie(element){
    let formUpdateCompanie = document.querySelector('.form-update-companie');
    formUpdateCompanie.classList.remove('hidden');
    formUpdateCompanie.classList.add('flex');
    let elementSelected = element.target.parentElement.parentElement.parentElement.querySelector('.companie-email').textContent; 
    compagnies.forEach(element => {
      console.log(elementSelected, element.email)
      if (elementSelected === element.email){
        document.querySelector('.content-form-update-companie').innerHTML = `
        <input type="text" required name="companie_name" placeholder="Companie name" value="${element.compagnie_name}">
        <input type="text" name="address" placeholder="Address" value="${element.address}" required>
        <textarea name="description" class="compagnie_desc" placeholder="decription about your companie" value="${element.companie_desc}" cols="30" rows="10"></textarea>
        <input type="url" name="link" placeholder="Link to yout website" value="${element.link}">
        <input type="hidden" name="id" value="${element.id}">
        `
      }
    });
  }

  let companieSubmit = document.querySelector('.update-submit-companie')
  companieSubmit.addEventListener('click', (e)=>{
    e.preventDefault();
    let contentFormUpdateCompanie = document.querySelector('.content-form-update-companie');
    const id = contentFormUpdateCompanie.querySelector('input[name="id"]').value
    const companie_name = contentFormUpdateCompanie.querySelector('input[name="companie_name"]').value
    const address = contentFormUpdateCompanie.querySelector('input[name="address"]').value
    const companie_desc = contentFormUpdateCompanie.querySelector('textarea').value
    const link = contentFormUpdateCompanie.querySelector('input[name="link"]').value
    var body = {
      "id": id,
      "companie_name": companie_name,
      "address": address,
      "companie_desc": companie_desc,
      "link": link,
    }
    console.log(body)
    const option={
      method: "post",
      headers:{
          "Content-Type":"application/json",
          // "Authorization": "Bearer "+localStorage.getItem('token');
      },
      body:JSON.stringify(body)
    }
    fetch("http://localhost:4000/updateCompagnies",option).then((data) => {
      console.log(data);
      fetch("http://localhost:4000/adminCompagnies",option).then(data => data.json())
      .then((data) => {
        let payload= JSON.stringify(jwtDecode(data));
        localStorage.setItem("compagnies", payload);
        location.replace("http://localhost:4000/dashboard")
      })
    })
  });

})
// .addEventListener('click', (e)=>{
//   console.log(e.target);
// })



function jwtDecode (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  };
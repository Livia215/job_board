let tableUsers = document.querySelector('#content-users tbody');
let tableCompanies = document.querySelector('#content-companies tbody');
let tableAdvertisements = document.querySelector('#content-advertisements tbody');
let array = [1,2,3,4,5]

window.addEventListener('load', () => {
  for (let index = 0; index < array.length; index++) {
    tableUsers.innerHTML += `
    <tr>
      <td>First name</td>
      <td>Last name</td>
      <td>email@email.com</td>
      <td>Role</td>
      <td class="table-col-settings flex">
        <button class="button-settings-user">
          <img src="https://res.cloudinary.com/dxzrvtzyt/image/upload/v1634220476/JobBoard/setting_nhcek5.png" alt="Settings" width="20">
        </button>
        <button class="button-delete-user">
          <img src="https://res.cloudinary.com/dxzrvtzyt/image/upload/v1634220495/JobBoard/bin_onxcad.png" alt="Settings" width="20">
          <input type="hidden" name="id-user">
        </button>
      </td>
    </tr>
    `;
  }
  let buttonSettingUser = document.getElementsByClassName('button-settings-user');
  let buttonDeleteUser = document.getElementsByClassName('button-delete-user');
  let numUsers = buttonSettingUser.length;

  for (var i = 0; i < numUsers; i++) {
    buttonSettingUser[i].addEventListener('click', openSettingsUser, false);
    // buttonDeleteUser[i].addEventListener('click', 1, false);
  }
  for (let index = 0; index < array.length; index++) {
    tableCompanies.innerHTML += `
    <tr>
      <td>lzkiljkr</td>
      <td>32 rue domer, 69007 Lyon</td>
      <td>email@email.com</td>
      <td class="table-col-settings flex">
        <button class="button-settings-companie">
          <img src="https://res.cloudinary.com/dxzrvtzyt/image/upload/v1634220476/JobBoard/setting_nhcek5.png" alt="Settings" width="20">
        </button>
        <button class="button-delete-companie">
          <img src="https://res.cloudinary.com/dxzrvtzyt/image/upload/v1634220495/JobBoard/bin_onxcad.png" alt="Settings" width="20">
          <input type="hidden" name="id-companie">
        </button>
      </td>
    </tr>
    `;
  }
  let buttonSettingCompanie = document.getElementsByClassName('button-settings-companie');
  let buttonDeleteCompanie = document.getElementsByClassName('button-delete-companie');
  let numCompanies = buttonSettingCompanie.length;

  for (let index = 0; index < array.length; index++) {
    tableAdvertisements.innerHTML += `
    <tr>
      <td>Toutoutou</td>
      <td>Développeur front VueJS H/F</td>
      <td>Crottin de cheval</td>
      <td>Full-time</td>
      <td>DAte creation</td>
      <td>
      <button class="button-settings-companie">
        <img src="https://res.cloudinary.com/dxzrvtzyt/image/upload/v1634220476/JobBoard/setting_nhcek5.png" alt="Settings" width="20">
      </button>
      <button class="button-delete-companie">
        <img src="https://res.cloudinary.com/dxzrvtzyt/image/upload/v1634220495/JobBoard/bin_onxcad.png" alt="Settings" width="20">
        <input type="hidden" name="id-companie">
      </button>
      </td>
    </tr>
    `;
  }
})

document.querySelector('#button-companies').addEventListener('click', () => {
  

  // for (var i = 0; i < numCompanies; i++) {
  //   buttonSettingCompanie[i].addEventListener('click', openSettingsCompanie, false);
  //   buttonDeleteCompanie[i].addEventListener('click', validationDeleteCompanie, false);
  // }
})

document.querySelector('#button-advertisements').addEventListener('load', () => {
})

function openSettingsUser(element){
  let formUpdateUSer = document.querySelector('.form-update-user');
  formUpdateUSer.classList.remove('hidden');
  formUpdateUSer.classList.add('flex');
}

document.querySelector('#form-update-user').addEventListener('click', () => {
  document.querySelector('#form-update-user').classList.remove('flex');
  document.querySelector('#form-update-user').classList.add('hidden');
})
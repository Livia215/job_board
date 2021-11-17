let header = document.querySelector('header');

window.addEventListener("load", function() {
  header.innerHTML = `
    <h1><a href="/">Job Board</a></h1>
    <ul class="flex">
      <li id="login" class="flex"><a href="/login">Login</a></li>
      <li id="register" class="flex"><a href="/register">Register</a></li>
      <li id="accountUser" class="hidden"><a href="/account">Account</a></li>
      <li id="advertisement" class="hidden"><a href="/advertisement">Add advertisement</a></li>
      <li id="accountCompanie" class="hidden"><a href="/profile">Profile</a></li>
      <li id="dashboard" class="hidden"><a href="/dashboard">Dashboard</a></li>
      <li id="logout" class="hidden"><a href="" >Logout</a></li>
    </ul>
  `;
  let user = jwtDecode(localStorage.getItem('token'))
  let logoutButton = document.querySelector("#logout");
  let userAccountButton = document.querySelector("#accountUser");
  let companieAccountButton = document.querySelector("#accountCompanie");
  let dashboardButton = document.querySelector("#dashboard");
  let advertisementButton = document.querySelector("#advertisement");
  if(localStorage.getItem("token")){
    toggleButton()
    if (user.role === 'user') {
      userAccountButton.classList.remove('hidden');
      userAccountButton.classList.add('flex');
    } else if (user.role === 'compagnie') {
      companieAccountButton.classList.remove('hidden');
      companieAccountButton.classList.add('flex');
      advertisementButton.classList.remove('hidden');
      advertisementButton.classList.add('flex');
    } else if (user.role === 'admin') {
      dashboardButton.classList.remove('hidden');
      dashboardButton.classList.add('flex');
    }
  };
  logoutButton.addEventListener('click', function(){
    toggleButton()
    if (dashboardButton.classList.contains('flex')) {
      dashboardButton.classList.remove('flex');
      dashboardButton.classList.add('hidden');
    } else if (userAccountButton.classList.contains('flex')){
      userAccountButton.classList.remove('flex');
      userAccountButton.classList.add('hidden');
    } else if (companieAccountButton.classList.contains('flex')) {
      companieAccountButton.classList.remove('flex');
      companieAccountButton.classList.add('hidden');
      advertisementButton.classList.remove('flex');
      advertisementButton.classList.add('hidden');
    }
  })
});

function jwtDecode (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

function toggleButton() {
  let logoutButton = document.querySelector("#logout");
  let loginButton = document.querySelector("#login");
  let registerButton = document.querySelector("#register");
  logoutButton.classList.toggle('hidden');
  logoutButton.classList.toggle('flex');
  loginButton.classList.toggle('flex');
  loginButton.classList.toggle('hidden');
  registerButton.classList.toggle('flex');
  registerButton.classList.toggle('hidden');
}
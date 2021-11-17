let header = document.querySelector('header');

window.addEventListener("load", function() {
  header.innerHTML = `
    <h1><a href="/">Job Board</a></h1>
    <ul class="flex">
      <li><a href="/login">Login</a></li>
      <li><a href="/register">Register</a></li>
      <li><a href="" id="logout" class="hidden">Disconnection</a></li>
    </ul>
  `;
  let logoutButton = document.querySelector("#logout");
  if(localStorage.getItem("token")){
    logoutButton.classList.remove('hidden');
    logoutButton.classList.add('flex');
  };
  logoutButton.addEventListener('click', function(){
    logoutButton.classList.add('hidden');
    logoutButton.classList.remove('flex');
  })
});


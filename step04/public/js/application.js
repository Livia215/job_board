document.querySelector('.application-submit').addEventListener('click', (e)=>{
    e.preventDefault()
    const dataAdvertisement = JSON.parse(localStorage.getItem('advertisements'));
    const token = jwtDecode(localStorage.getItem('token'));
    
    console.log(dataAdvertisement, "data");
    console.log(token , "token");
   
    const name = document.querySelector('input[name="name"]').value
    const phone = document.querySelector('input[name="phone"]').value
    const email = document.querySelector('input[name="email"]').value
    const message = document.querySelector('#message').value
    var body ={
        "name": name,
        "phone": phone,
        "email": email,
        "message": message,
    }
    
    const option={
        method: "post",
        headers:{
            "Content-Type":"application/json",
            // "Authorization": "Bearer "+localStorage.getItem('token');
        },
        body:JSON.stringify(body)
    }
    // fetch("http://localhost:4000/addApplication",option).then(data => data.json())
    // .then((data) => {
    //     let payload= jwtDecode(data);
    //     localStorage.setItem("token", data);
    // })
})

function jwtDecode (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  };
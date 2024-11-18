let form = document.querySelector("form");
let UserName = document.querySelectorAll("input")[0];
let password = document.querySelectorAll("input")[1];
let  euser =  document.querySelectorAll("span")[0];
let epass = document.querySelectorAll("span")[1];
let eform = document.querySelectorAll("span")[2];
let dataFromstorage = JSON.parse(localStorage.getItem("data"));
console.log(dataFromstorage);




console.log(form, UserName, password, euser,epass, eform);


form.addEventListener("submit", (e)=>{
     euser.innerHTML ="";
     epass.innerHTML = "";
     eform.innerHTML = "";

     // matching the details
       let matchData = dataFromstorage.find((e)=>{
          if(e.phone == UserName.value && e.pass == password.value ||
            e.mail == UserName.value && e.pass == password.value
          ){
            return e;   
          }
       });
     if(UserName.value == "" && password.value == ""){
        euser.innerHTML = `enter the username or mobile number`;
        epass.innerHTML = ` Enter the password`;
        e.preventDefault();
     }
     else  if(UserName.value == ""){
        euser.innerHTML = `enter the username or mobile number`;
       e.preventDefault();
     }
     else if(password.value == ""){
       epass.innerHTML = `Enter the Password`;
       e.preventDefault();
     }
     else if(matchData){
        alert('welcome to the page');
        localStorage.setItem("oneuser", JSON.stringify(matchData));
     }
     else{
        eform.innerHTML = "Match not found";
        e.preventDefault();
     }
})

let h3 = document.querySelector("h3");
h3.addEventListener("click", ()=>{
    if(h3.innerHTML == "show"){
        password.type = "text";
        h3.innerHTML = "hide";
    }
    else{
        password.type = "password";
        h3.innerHTML ="show";

    }
})


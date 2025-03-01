let form = document.querySelector("form");
// targeting input fields
let userName = document.querySelectorAll("input")[0];
let password = document.querySelectorAll("input")[1];
//their span tags
let eUser =   document.querySelectorAll("span")[0];
let ePass = document.querySelectorAll("span")[1]
// submit button span tag
let eBtn = document.querySelectorAll("span")[2]

// access data from storage
let datafromstorage = JSON.parse(localStorage.getItem("data"));
console.log(datafromstorage);
//console.log(userName, password, eBtn, eUser, ePass);


form.addEventListener("submit", (e)=>{
       // first it should be empty
    eUser.innerHTML ="";
    ePass.innerHTML = "";
    eBtn.innerHTML = "";
    // matching the details of user using mobile or email 

    let matchData = datafromstorage.find((e)=>{
    if((e.phone  == userName.value &&  e.pass == password.value )|| (e.mail == userName.value && e.pass == password.value)){
           return e;
    }
    });
    if(userName.value == "" && password.value == ""){
        eUser.innerHTML = `*Enter the username or mobile number`;
        ePass.innerHTML = ` Enter the password`;
        e.preventDefault();
     }
     else  if(userName.value == ""){
        eUser.innerHTML = `enter the username or mobile number`;
       e.preventDefault();
     }
     else if(password.value == ""){
       ePass.innerHTML = `Enter the Password`;
       e.preventDefault();
     }
     else if(matchData){
        alert("Your are pet Lover");
        localStorage.setItem("Petlover", JSON.stringify(matchData));
     }
     else{
        eBtn.innerHTML = "Match not found";
        e.preventDefault();
     }
});

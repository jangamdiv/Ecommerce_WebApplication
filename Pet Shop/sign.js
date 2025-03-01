// inputs 
let form = document.querySelector("form");
let userName = document.querySelectorAll("input")[0];
let mobile = document.querySelectorAll("input")[1];
let email = document.querySelectorAll("input")[2];
let CreatePassword = document.querySelectorAll("input")[3]
let ConfirmPassword = document.querySelectorAll("input")[4];

// spans
let euser = document.querySelectorAll("span")[0];
let emobile = document.querySelectorAll("span")[1];
let eemail = document.querySelectorAll("span")[2];
let epass = document.querySelectorAll("span")[3];
let ecpass  = document.querySelectorAll("span")[4];

// for storage 
let storage = [];

 let datafromstorage =  JSON.parse(localStorage.getItem("data")) 
if(datafromstorage){
  storage = datafromstorage;
  
}
console.log(storage, datafromstorage);
console.log(typeof storage); // Should be "object" for arrays
console.log(Array.isArray(storage)); // Should be true for arrays


// events 
form.addEventListener("submit", (e)=>{
    
     let flag = true;
    // username validation 
    let regxU =  /^[a-z A-z]{1,15}$/;
    if(userName.value == ""){
         euser.innerHTML = `*Please enter  Name`;
         e.preventDefault();
         flag = false;
    }
    else if(regxU.test(userName.value)){
        euser.innerHTML = "";
    }
    else{
        euser.innerHTML = `*Enter the valid name  must contain space`
        e.preventDefault();
        flag = false;
        
    }

    //mobile validation 
    let regxM = /^[6-9][0-9]{9}$/
     let mobcheck =   storage.find((e)=>{
      if (e.phone == mobile.value) {
           return e;
      }
     })
   if(mobcheck){
           emobile.innerHTML = "*mobile already Register";
           e.preventDefault();
           flag = false;
   } 
    else if (mobile.value == "") {
    emobile.innerHTML = `*Enter the Mobile Number`
    e.preventDefault();
    flag = false;
   } else if(regxM.test(mobile.value)){
     emobile.innerHTML = "";
   }
   else{
    emobile.innerHTML = `*Enter the valid mobile number`;
    e.preventDefault();
    flag = false;
   }

   // email validation
     let emailcheck = storage.find((e)=>{
        if(e.mail == email.value){
          return e;
        }
     });
     if(emailcheck){
          eemail.innerHTML = "*Email Already Register"
          e.preventDefault(); 
          flag = false;
     }
   else  if(email.value ==""){
    eemail.innerHTML = `Enter the Email`
    e.preventDefault(); 
    flag = false;
   }
   else{
    eemail.innerHTML= "";
   }

   //create password

   let regxP = /^[a-zA-Z0-9!@#$]{6,15}$/
   if(CreatePassword.value == ""){
    epass.innerHTML = `*Enter the Password`;
    e.preventDefault();  
    flag = false; 
   }
   else if(regxP.test(CreatePassword.value)){
    epass.innerHTML = "";
   }
    else{
      epass.innerHTML = `*Invalid Password`;
      e.preventDefault();
      flag = false;
    }

    // confirm password
   if(ConfirmPassword.value == ""){
        ecpass.innerHTML = `Enter the password`;
        e.preventDefault();
        flag = false;
   }
   else if(ConfirmPassword.value == CreatePassword.value){
    ecpass.innerHTML = "";
   }
   else{
    ecpass.innerHTML = `*Wrong Password Enter`;
    e.preventDefault();
    flag = false;
   };

if(flag){
let data = {
      name: userName.value,
      phone: mobile.value,
      mail: email.value,
      pass:CreatePassword.value,
      cartItems: null,
}
storage.push(data);
localStorage.setItem("data", JSON.stringify(storage));
console.log(data);
}   
});



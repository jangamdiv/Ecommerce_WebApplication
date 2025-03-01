// input tags
let form = document.querySelector("form");
let firstName = document.querySelectorAll("input")[0];
let lastName = document.querySelectorAll("input")[1];
let email = document.querySelectorAll("input")[2];
let mobile = document.querySelectorAll("input")[3];
let createPassword = document.querySelectorAll("input")[4];
let confirmPassword = document.querySelectorAll("input")[5];
// span tags
let efirst = document.querySelectorAll("span")[0];
let elast = document.querySelectorAll("span")[1];
let eemail = document.querySelectorAll("span")[2];
let emobile = document.querySelectorAll("span")[3];
let epass  = document.querySelectorAll("span")[4];
let ecpass  = document.querySelectorAll("span")[5];

// console.log( form , firstName, 
// lastName, email, mobile,  createPassword, confirmPassword);

// console.log( efirst, elast, eemail, emobile, epass, ecpass);

// to store  the details present in object in array
let storage = [];
let datafromStorage =  JSON.parse(localStorage.getItem("data")); 
if(datafromStorage){
    storage = datafromStorage;
}

console.log(datafromStorage, storage);

form.addEventListener("submit", (e)=>{
      

    // flag variable 
    let flag = true;

     // --- first namme validation
    let regx = /^[a-zA-Z]{1,17}$/        // regular expression

      if(firstName.value == ""){
        efirst.innerHTML = `*Enter the first name`;
        e.preventDefault();
         flag = false;
      }
      else if(regx.test(firstName.value)){
          efirst.innerHTML = ""; 
      }
      else{
        efirst.innerHTML = "*Invalid First Name";
        e.preventDefault();
         flag = false;
      }
    // last name validation
    if(lastName.value == ""){
        elast.innerHTML = `*Enter the last name`;
        e.preventDefault();
         flag = false;
    }
    else if(regx.test(lastName.value)){
        lastName.innerHTML = "";
    }
    else{
        elast.innerHTML = `*Invalid Last Name`;
        e.preventDefault();
         flag = false;
    }

    // -----email validation 
     let emailCheck = storage.find((e)=>{
         if(e.mail == email.value){
              return e;
         };
     });
     if(emailCheck){
        eemail.innerHTML = `*Email already registered`;
        e.preventDefault();
         flag = false;
     }
    else  if(email.value == ""){
        eemail.innerHTML = `*Enter the email`;
        e.preventDefault();
         flag = false;
    }
    else{
        eemail.innerHTML = "";
        
    }

    // ----mobile validation 
  let regxmob = /^[6-9][0-9]{9}$/
  let  mobileCheck =  storage.find((e)=>{
             if(e.phone == mobile.value){
                return e;
             }
  })
 
  // conditions
     if(mobileCheck){
         emobile.innerHTML = "* mobile number already  registered";
         e.preventDefault();
          flag = false;
     }
    else if(mobile.value == ""){
    emobile.innerHTML = `*Enter the mobile Number`;
    e.preventDefault();
     flag = false;
   }
   else if(regxmob.test(mobile.value)){
    emobile.innerHTML = "";
   }
   else{
    emobile.innerHTML = "*Invalid Mobile Number";
    e.preventDefault();
     flag = false;

   }

   // Create Password  validation
   let regxpass = /^[a-zA-Z0-9!@]{6,15}$/
   if(createPassword.value == ""){
    epass.innerHTML = `*Enter the Password`;
    e.preventDefault();
     flag = false;
   }
   else if(regxpass.test(createPassword.value)){
    epass.innerHTML = "";
   }
    else{
      epass.innerHTML = `*Invalid Password`;
      e.preventDefault();
       flag  = false;
    }

    // confirm Password validation

    if(confirmPassword.value == ""){
        ecpass.innerHTML = `*enter the password`;
        e.preventDefault();
         flag = false;
    }
    else if (confirmPassword.value == createPassword.value){
        ecpass.innerHTML = "";

    }
    else{
        ecpass.innerHTML = `*Password Not Matching`;
        e.preventDefault();
         flag = false;
    }
  

    // store the data in local storage 
    if(flag){
        let details = {
            first: firstName.value,
            last: lastName.value,
            mail: email.value,
            phone: mobile.value,
            pass: createPassword.value,
            cartItems: null,
 
     };
     storage.push(details);
     localStorage.setItem("data", JSON.stringify(storage));
     console.log(details);
    }
    

    
});



    


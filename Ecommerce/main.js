
let cartItems = [];
let  data =  JSON.parse(localStorage.getItem("data"));
let oneuser = JSON.parse(localStorage.getItem("oneuser"));
console.log(data, oneuser);

let count = document.querySelector("#count")
if(oneuser.cartItems){
  count.innerHTML = cartItems.length;
  cartItems = oneuser.cartItems;        
}
//function for logout and login
function loginLogout(){
    // getting the  user data from  local storage
let login = document.querySelector("#right");
let oneuserdata = JSON.parse(localStorage.getItem("oneuser")) ;
//user Information
    if(oneuserdata){
        //providing the information inside right divsion
        login.innerHTML = `<span>${oneuserdata.first}</span> <a href="./main.html"> <button id="logout">Log Out</button></a>`
          // accessing  logout button 
        let logout = document.querySelector("#logout");
        
        //logout event
        logout.addEventListener("click",(e)=>{
            localStorage.removeItem("oneuser");
           
        });      
    }
}

loginLogout();

//fetching data from server 
async function allProductsData(){
    //responce object
   let dataFromServer = await  fetch("https://www.shoppersstack.com/shopping/products/alpha");
   // DataObject in js format
    let ConvertedData = await dataFromServer.json();
    //only data property
    let alldata = ConvertedData.data;
   console.log(alldata);
   // -- filter the data for men

   let menData =  alldata.filter((e)=>{
     if(e.category == "men"){
        return e;
     }
   });
// filtered women data 
   let womenData = alldata.filter((e)=>{
      if(e.category == "women"){
         return e;
      }
   });
 // filtered kids data 
   let kidsData = alldata.filter((e)=>{
         if(e.category == "kids"){
            return e;
         }
   })
// // filtered women data 
   let electronicsData = alldata.filter((e)=>{
      if(e.category == "electronics"){
        return e;
      }
   })
 
   let Maleoutput = document.querySelector("#maleCont");
    // male data output
   menData.map((e)=>{
       Maleoutput.innerHTML += `<div  id="${e.productId}"> 
                <img src="${e.productImageURLs[0]}" alt="">
                <h3>${e.name}</h3>
                <h2>Price: ${e.price}</h2>
                <h2> Rating: ${e.rating}</h2>
                <button>Add to Cart</button>
            </div>`;
   })

   let femaleOutput = document.querySelector("#femaleCont");
   // women data output
   womenData.map((e)=>{
    femaleOutput.innerHTML += `<div id="${e.productId}"> 
    <img src="${e.productImageURLs[0]}" alt="">
    <h3>${e.name}</h3>
    <h2>Price: ${e.price}</h2>
    <h2> Rating: ${e.rating}</h2>
    <button>Add to Cart</button>
    </div>`;})
   
    let kidsOutput = document.querySelector("#kidsCont");
    //kids data output
    kidsData.map((e)=>{
        kidsOutput.innerHTML += `<div id="${e.productId}" > 
    <img src="${e.productImageURLs[0]}" alt="">
    <h3>${e.name}</h3>
    <h2>Price: ${e.price}</h2>
    <h2> Rating: ${e.rating}</h2>
    <button>Add to Cart</button>
    </div>`;
    });
    
    let electronicsOutput = document.querySelector("#electronics");
    //electronics data output
    electronicsData.map((e)=>{
        electronicsOutput.innerHTML += `<div id="${e.productId}"> 
    <img src="${e.productImageURLs[0]}" alt="">
    <h3>${e.name}</h3>
    <h2>Price: ${e.price}</h2>
    <h2> Rating: ${e.rating}</h2>
    <button>Add to Cart</button>
    </div>`;
    });

  // === search result

  let input = document.querySelector("input"); // to get the value
  let searchBtn = document.querySelector("#searchBtn"); // when to display
  let searchResult = document.querySelector("#searchResult"); // 
  console.log(input, searchBtn, searchResult); // where to search
   
  // to display the search product
  searchBtn.addEventListener("click",(e)=>{
     searchResult.innerHTML = "";
           alldata.map((e)=>{
            if(e.name.toLocaleLowerCase().includes(input.value.trim().toLocaleLowerCase())){
                searchResult.innerHTML += `<div  id="${e.productId}> 
      <img src="${e.productImageURLs[0]}" alt="">
    <h3>${e.name}</h3>
    <h2>Price: ${e.price}</h2>
    <h2> Rating: ${e.rating}</h2>
    <button>Add to Cart</button>
    </div>`;
    }
  });
  });
   
  // accessing  all add to cart button
  let main  = document.querySelector("main");
  let allBtn = main.querySelectorAll("button");
  console.log(allBtn);


  
  allBtn.forEach((btn)=>{
    btn.addEventListener("click", ()=>{

      if(oneuser)
      {
        console.log(btn.parentElement);
      //cartItems not any  having duplicate 
      cartItems = cartItems.filter((e)=>{
        if(e.productId != btn.parentElement.id)
         return e;
     })
     // to find the product
     let product = alldata.find((e)=>{
       if(e.productId == btn.parentElement.id){
        return e;
       }
     });
     // clicked  product added to  cart 
     cartItems.push(product);
     oneuser.cartItems = cartItems;
     console.log(oneuser);
     // storing data in local storage
      localStorage.setItem("oneuser", JSON.stringify(oneuser));

   data =data.filter((e)=>{
        if(e.phone != oneuser.phone){
          return e;
        }
   })
   data.push(oneuser);
    console.log(data);
    localStorage.setItem("data", JSON.stringify(data));
    count.innerHTML = cartItems.length;
      }
      else{
        alert("login first");
        window.location.href = "./login.html";
      }

    });
    
  });
  
   
}
allProductsData();




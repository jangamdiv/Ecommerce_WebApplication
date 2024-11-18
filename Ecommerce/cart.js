let oneuser = JSON.parse(localStorage.getItem("oneuser"));
let cartItems = oneuser.cartItems;
let data = JSON.parse(localStorage.getItem("data"));
console.log(oneuser);

let main = document.querySelector("main");

function display(){
        main.innerHTML = "";
     cartItems.map((e)=>{
        main.innerHTML +=`
        <div id = "${e.productId}"> 

         <div> 
            <img src="${e.productImageURLs[0]}" alt="">
         </div>
          <div> 
           <h3>${e.name}</h3>
            <h2>${e.price} </h2>
          </div>

           <div> 
             <button>Delete <button>
           </div>
        </div>
        `
     });
     del();
     GT();
}
display();

function del(){
    
    let allBtn = main.querySelectorAll("button");
    allBtn.forEach((btn)=>{
        btn.addEventListener("click", ()=>{
            let confirmation = confirm("Are you sure you want to remove the product?");
            if(confirmation){
                 cartItems = cartItems.filter((e)=>{
                   if(btn.parentElement.parentElement.id != e.productId){
                    return e;
                   }
                 });
                 display();
                 oneuser.cartItems = cartItems;
     console.log(oneuser);
     // storing data in local storage
      localStorage.setItem("oneuser", JSON.stringify(oneuser));
      //
   data =data.filter((e)=>{
        if(e.phone != oneuser.phone){
          return e;
        }
   })
   data.push(oneuser);
    console.log(data);
    localStorage.setItem("data", JSON.stringify(data));
            } 
        });       
        
    });
}
del();


function GT(){
    let sum = 0;
     cartItems.map((e)=>{
       sum = sum + e.price;

     });
     let total = document.querySelector("#total");
     total.innerHTML = sum;
}

GT();
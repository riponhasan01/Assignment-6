


const loadCategorie = ()=>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res)=> res.json())
     .then((json)=> displayCategorie(json.categories));
};


const displayCategorie=(cats)=>{
    const categorieContainer = document.getElementById("Categorie-container");
    displayCategorie.innerHTML="";

    for( let cat of cats){
       
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML= ` <a id="category-btn-${cat.id}" onclick="loadCardCategorie(${cat.id})"  href="#" class="flex items-center justify-between px-4 py-2 font-medium hover:bg-green-700 hover:text-white rounded-sm click-btn">
        <span>${cat.category_name} </span> </a>
        
        
        `;
        categorieContainer.append(btnDiv);
    }

};




const loadCardCategorieAll=(id)=>{
   
    fetch("https://openapi.programming-hero.com/api/plants")
    .then((res)=>res.json())
    .then(data=> displayCard(data.plants))
};
loadCardCategorieAll();


const removeActive=()=>{
    const clickButtons =document.querySelectorAll(".click-btn");
    clickButtons.forEach((btn)=>btn.classList.remove("active"))
    
}

const loadCardCategorie = (id)=>{
     manageSpiner(true)
    const url=`https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
    .then (res => res.json())
    .then (data=> {
        removeActive();
        const clickBtn =document.getElementById(`category-btn-${id}`);
       clickBtn.classList.add("active");
        displayCard(data.plants)
    });
};

const loadPlantDetails= async(id)=>{
    const url =(`https://openapi.programming-hero.com/api/plant/${id}`)
  const res = await fetch(url);
  const details = await res.json();
  displayPlantDetails(details.plants);
}

const displayPlantDetails = (plants)=>{
    
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML=`<div class="m-5">
        <h1 class="font-bold">${plants.name}</h1>
        <img class="h-[280px] w-full" src="${plants.image}" alt="">
        <span class="font-semibold">Category:</span> <span>${plants.category}</span> <br>
        <span class="font-semibold">Price:</span> <span>${plants.price}</span><br>
        <span class="font-semibold">Description:</span><span>${plants.description}</span>
        
      </div>`;
    document.getElementById("plants_details_modal").showModal();
    

}


const displayCard=(cards)=>{
    const cardContainer =document.getElementById("card-container");
    cardContainer.innerHTML="";

    cards.forEach((card) =>{
        const cardCat = document.createElement("div")
        cardCat.innerHTML=`
         
        <div >
                <div class="space-y-4 bg-white p-4  rounded-2xl shadow-sm ">
                <img class="h-[200px] w-full "  src="${card.image}" alt="">
                <h2 id="${card.id}" onclick="loadPlantDetails(${card.id})" class="font-bold text-xl cursor-pointer"> ${card.name}</h2>
                <p class="text-gray-500 h-30">${card.description}</p>
                <div class=" flex justify-between ">
                  <p class="font-semibold text-[#15803D] px-2 bg-[#9EF9BD] rounded-xl ">${card.category}</p>
                  <p><i class="fa-solid fa-bangladeshi-taka-sign"></i><span class="font-semibold">${card.price}</p> <br>
                </div>
                 <a class="btn add-to-cart bg-[#15803d] rounded-3xl border-none text-green-900 w-full text-white text-lg" >Add to Cart</a></div>
              </div>
        
        `
        cardContainer.append(cardCat)

    })
    manageSpiner(false)   
}

  const cardContainer =document.getElementById("card-container").addEventListener("click" , (e)=>{
       
        if(e.target.innerText === "Add to Cart"){          
            handleYourCart(e)
          
            
        }  
    }) 
    const handleYourCart = (e)=>{
        const title =e.target.parentNode.children[1].innerText
        const id = e.target.parentNode.children[1].id
        const price=e.target.parentNode.children[3].children[1].children[1].innerText  
        const doubleItem = yourCarts.find(item => item.id===id)
        if(doubleItem) {
             alert(`Warning ⚠️ ${title} is already in the cart`);
             return
        }
        yourCarts.push({
           title:title ,
           id:id ,
            price:parseInt(price)
          })
          
          alert(`${title} has been added to cart`);
           showYourcarts(yourCarts);
         
          
    }
    const showYourcarts =(yourCarts)=>{
        
        yourCartContainer.innerHTML=""

       if(yourCarts.length === 0){
    totalPriceDiv.innerHTML = `<div  class="text-right"><h1 class="font-bold ">Total Price : <span><i class="fa-solid fa-bangladeshi-taka-sign"></i>0</span></h1></div>`; 
    return
} 

        let totalPrice= 0;

       yourCarts.forEach(yourcart =>{

         totalPrice += yourcart.price;

        const cartDivCreate = document.createElement("div")
       
        cartDivCreate.innerHTML=`
             <div class="bg-[#cff0dc] flex justify-between  items-center p-2 rounded-lg">
            <div >
                  <h1 id="cart-items" class="font-bold">${yourcart.title}</h1>
                  <p><i class="fa-solid fa-bangladeshi-taka-sign"></i> <span class="total-price">${yourcart.price}</span></p>
                </div>
                <div onclick="handleCartRemove('${yourcart.id}')" class="remove-item"><i class="fa-solid fa-xmark"></i>
                </div>
                </div
        `
        yourCartContainer.append(cartDivCreate)

         totalPriceDiv.innerHTML=`

    <div  class="text-right"><h1 class="font-bold ">Total Price : <span><i class="fa-solid fa-bangladeshi-taka-sign"></i>${totalPrice}</span></h1></div>
    `
        
       })
       

        
    }
    
 const handleCartRemove =(yourcartId)=>{
    const filteredYourCarts = yourCarts.filter( yourCart => yourCart.id !== yourcartId)
    yourCarts = filteredYourCarts
    showYourcarts(yourCarts);
 }

const manageSpiner =(status)=>{
    if (status == true){
        document.getElementById("spiner").classList.remove("hidden")
        document.getElementById("card-containerAll").classList.add("hidden")
        }
     else{
        document.getElementById("card-containerAll").classList.remove("hidden")
        document.getElementById("spiner").classList.add("hidden")
        }
   
}

const totalPriceDiv = document.getElementById("total-price")
   


let yourCarts =[];



const yourCartContainer=document.getElementById("yourCartContainer")

loadCategorie()















// document.querySelector(".add-to-card").forEach(button =>{
//     button.addEventListener("click" , () =>{
//         const treeName =button.getAttribute(card.name);
//         const treePrice =parseInt (button.getAttribute(card.price));


//         const yourCart = document.createElement("div");
//         yourCart.innerHTML=`
//         <div class="bg-[#cff0dc] flex justify-between items-center p-2 ">
//                 <div >
//                   <h1 class="font-bold">${treeName}</h1>
//                   <p><i class="fa-solid fa-bangladeshi-taka-sign"></i> <span>${treePrice}</span></p>
//                 </div>
//                 <div><i class="fa-solid fa-xmark"></i></div>
//               </div>
        
        
//         `


//     })
// })

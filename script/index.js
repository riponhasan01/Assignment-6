


const loadCategorie = ()=>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res)=> res.json())
     .then((json)=> displayCategorie(json.categories));
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
    console.log(plants);
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML=`<div class="m-5">
        <h1 class="font-bold">${plants.name}</h1>
        <img src="${plants.image}" alt="">
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
         
        <div class="space-y-4 bg-white p-4  rounded-2xl shadow-sm  ">
                <img  src="${card.image}" alt="">
                <h2 onclick="loadPlantDetails(${card.id})" class="font-bold text-xl cursor-pointer"> ${card.name}</h2>
                <p class="text-gray-500">${card.description}</p>
                <div class=" flex justify-between ">
                  <p class="font-semibold text-[#15803D] px-2 bg-[#9EF9BD] rounded-xl ">${card.category}</p>
                  <p><i class="fa-solid fa-bangladeshi-taka-sign"></i><span class="font-semibold">${card.price}</p> <br>
                </div>
                 <a class="btn bg-[#15803d] rounded-3xl border-none text-green-900 w-full text-white text-lg" >Add to Cart</a>
              </div>
        
        `
        cardContainer.append(cardCat)

    })
}

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

loadCategorie()
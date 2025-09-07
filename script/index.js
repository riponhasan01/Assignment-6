

const loadCategorie = ()=>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res)=> res.json())
     .then((json)=> displayCategorie(json.categories));
};

const loadCardCategorie = (id)=>{
    const url=`https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
    .then (res => res.json())
    .then (data=> displayCard(data.plants));
};

const displayCard=(cards)=>{
    const cardContainer =document.getElementById("card-container");
    cardContainer.innerHTML="";

    cards.forEach((card) =>{

        console.log(card);
        
        const cardCat = document.createElement("div")
        cardCat.innerHTML=`
         
        <div class="space-y-4 bg-white p-4  rounded-2xl shadow-sm">
                <img src="${card.image}" alt="">
                <h2 class="font-bold text-xl"> ${card.name}</h2>
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
        btnDiv.innerHTML= ` <a onclick="loadCardCategorie(${cat.id})"  href="#" class="flex items-center justify-between px-4 py-2 font-medium hover:bg-green-700 hover:text-white rounded-sm">
        <span>${cat.category_name} </span> </a>
        
        
        `;
        categorieContainer.append(btnDiv);
    }

};

loadCategorie()
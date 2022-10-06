
let produitEnregistre = JSON.parse(localStorage.getItem("produit"));
console.log(produitEnregistre);

const positionPanier = document.querySelector("#cart__items");

let structurePanier = [];
for( k = 0; k < produitEnregistre.length; k++){
    structurePanier = structurePanier + 
    `
    <article class="cart__item" data-id="${produitEnregistre[k]._id}" data-color="${produitEnregistre[k].option_Couleur}">
                <div class="cart__item__img">
                  <img src="${produitEnregistre[k].image}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${produitEnregistre[k].nom}</h2>
                    <p>${produitEnregistre[k].option_Couleur}</p>
                    <p>${produitEnregistre[k].prix} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :  </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitEnregistre[k].option_Quantite}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" canapeId="${produitEnregistre[k]._id}" canapeCouleur="${produitEnregistre[k].option_Couleur}" >Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
              `
    if(k === produitEnregistre.lenght); {
    positionPanier.innerHTML = structurePanier;
    }
}


//function changeQuantite(){
  
  //const bouttonQuantitePanier = document.querySelectorAll("input.itemQuantity");
  //console.log(bouttonQuantitePanier);
  //for (i = 0; i < bouttonQuantitePanier.length; i++){
    //const bouttonQuantitePanierValeur = bouttonQuantitePanier.value;
      //console.log(bouttonQuantitePanier.value);
    //bouttonQuantitePanier[i].addEventListener("change", change);
    //function change() {
      
  // Modification d'une quantité de produit
  let bouttonQuantitePanier = document.querySelectorAll("input.itemQuantity");
  for (i = 0; i < bouttonQuantitePanier.length; i++){
    console.log(bouttonQuantitePanier[i]);
  bouttonQuantitePanier[i].addEventListener("change", nouvelleValeur);
   
  function nouvelleValeur(){
   for (i = 0; i < bouttonQuantitePanier.length; i++){
   const choixQuantiteAEcran = bouttonQuantitePanier[i].value;
   console.log(choixQuantiteAEcran);
   produitEnregistre.option_Quantite += choixQuantiteAEcran;
   localStorage.setItem("produit", JSON.stringify(produitEnregistre));
   console.log(produitEnregistre.option_Quantite);
   location.reload;
  }
  }
  }
 
  let bouttonSupprimer = document.querySelectorAll(".deleteItem");
  for (i = 0; i < bouttonSupprimer.length; i++){
    console.log(bouttonSupprimer[i]);
    bouttonSupprimer[i].addEventListener("click", e => {

      
      console.log("coucou");
      let canapeId = e.target.getAttribute("canapeId");
      console.log(canapeId);
      let canapeCouleur = e.target.getAttribute("canapeCouleur");
      console.log(canapeCouleur);
      const rechercheElementSupprimer = produitEnregistre.find(element => element._id == canapeId && element.option_Couleur == canapeCouleur);
      console.log(rechercheElementSupprimer);
      produitEnregistre = produitEnregistre.filter(item => item != rechercheElementSupprimer);
      localStorage.setItem("produit", JSON.stringify(produitEnregistre));
      window.location.href = "cart.html";
    })
  }







  




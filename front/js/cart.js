
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
                      <p class="deleteItem">Supprimer</p>
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
 let bouttonQuantitePanier = document.querySelectorAll(".itemQuantity");
 for (i = 0; i < bouttonQuantitePanier.length; i++){
   console.log(bouttonQuantitePanier[i]);
 const choixQuantiteEnregistre = bouttonQuantitePanier[i].value;
  console.log(choixQuantiteEnregistre);
 
  bouttonQuantitePanier[i].addEventListener("change", nouvelleValeur);
  function nouvelleValeur() {  
   for (i = 0; i < bouttonQuantitePanier.length; i++){
 let nouveauChoix = bouttonQuantitePanier[i].value;
  console.log("nouvelle quantité rensigné =", nouveauChoix);
  const test = produitEnregistre.find(el => el.option_Quantite !== nouveauChoix);
  test.option_Quantite = nouveauChoix;
  console.log("nouvelle quantite dans test.option_Quantite =", test.option_Quantite);
  localStorage.setItem("produit", JSON.stringify(produitEnregistre));
  console.log(produitEnregistre);
  //location.reload();
 
 } 
 }
 }





  




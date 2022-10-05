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

//let boutonQuantite = document.querySelectorAll("input");
//const boutonQuantiteValeur = boutonQuantite.value;
//console.log(boutonQuantiteValeur);


//function nouvelleQuantite() {
//boutonQuantite.addEventListener("change", nouvelleQuantite);

//function nouvelleQuantite() {
  
  //boutonQuantiteValeurNouveau = boutonQuantite.value;
  //produitEnregistre.option_Quantite = boutonQuantiteValeurNouveau;

  //localStorage.setItem("produit", JSON.stringify(produitEnregistre));
  //console.log(produitEnregistre);
//}

let bouttonSupprimer = document.querySelectorAll(".cart__item__content__settings__delete");
console.log(bouttonSupprimer);

function supprimerLigne() {
bouttonSupprimer.addEventListener("click" , supprimerLigne);



for (i = 0; i < bouttonSupprimer.length; i++) {

//sélection de l'ID qui va être supprimé
let idASupprimer = produitEnregistre[i]._id;
    console.log(produitEnregistre[i]._id);
    console.log(idASupprimer);


    //avec filter
    produitEnregistre = produitEnregistre.filter( element => element._id !== idASupprimer);
    console.log(produitEnregistre);



}
  }




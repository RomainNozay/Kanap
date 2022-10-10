
let produitEnregistre = JSON.parse(localStorage.getItem("panier"));
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
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100"canapeId="${produitEnregistre[k]._id} canapeCouleur="${produitEnregistre[k].option_Couleur}" value="${produitEnregistre[k].option_Quantite}">
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

      
  // Modification d'une quantité de produit
   // Modification d'une quantité de produit
 let bouttonQuantitePanier = document.querySelectorAll(".itemQuantity");
 for (l = 0; l < bouttonQuantitePanier.length; l++){
   console.log(bouttonQuantitePanier[l]);
 const choixQuantiteEnregistre = bouttonQuantitePanier[l].value;
  console.log(choixQuantiteEnregistre);

  bouttonQuantitePanier[l].addEventListener("change", e => {
    
 let nouveauChoix = bouttonQuantitePanier[l];
  console.log(typeof nouveauChoix);
  const test = produitEnregistre.find(el => el.option_Quantite !== nouveauChoix);
  test.option_Quantite = nouveauChoix;
  console.log("nouvelle quantite dans test.option_Quantite =", test.option_Quantite);
  //localStorage.setItem("panier", JSON.stringify(produitEnregistre));
  console.log(produitEnregistre);
  //location.reload();
  
  } )
}
 
   
  
 
  let bouttonSupprimer = document.querySelectorAll(".deleteItem");
  for (i = 0; i < bouttonSupprimer.length; i++){
    
    bouttonSupprimer[i].addEventListener("click", e => {
      
      let canapeId = e.target.getAttribute("canapeId");
      
      let canapeCouleur = e.target.getAttribute("canapeCouleur");
      
      const rechercheElementSupprimer = produitEnregistre.find(element => element._id == canapeId &&
         element.option_Couleur == canapeCouleur);
      
      produitEnregistre = produitEnregistre.filter(item => item != rechercheElementSupprimer);
      localStorage.setItem("panier", JSON.stringify(produitEnregistre));
      window.location.href = "cart.html";
    })
  }

  //Calcul du total d'article et prix total

  let listeQuantitePanier= [];
  
  for (i = 0; i < produitEnregistre.length; i++){
    let QuantiteChaquePanier = produitEnregistre[i].option_Quantite;
    
    const QuantiteNombre = parseInt (QuantiteChaquePanier);
    
    //Mettre quantité du panier dans une variable
    listeQuantitePanier.push(QuantiteNombre);
    
    //tableau avec toutes les quantités
  }
  
    // Aditionner les quantité avec reduce
  const reducer = (accumulator, Quantite) => accumulator + Quantite;
  const quantiteTotal = listeQuantitePanier.reduce(reducer,0);

  const positionQuantite = document.querySelector("#totalQuantity");
  const structureQuantitePanier = quantiteTotal;
  positionQuantite.innerHTML = structureQuantitePanier;

  //Calcul du prix total

  let listeSousTotaux = [];
  
  for (i = 0; i < produitEnregistre.length; i++){
    let QuantiteChaquePanier = produitEnregistre[i].option_Quantite;
    const QuantiteChaquePanierNombre = parseInt (QuantiteChaquePanier);
    let PrixChaquePanier = produitEnregistre[i].prix;
    let TotalChaqueLigne = QuantiteChaquePanierNombre * PrixChaquePanier;
    
    listeSousTotaux.push(TotalChaqueLigne);
    
  }

  const reducers = (accumulator, prix) => accumulator + prix;
  const prixTotal = listeSousTotaux.reduce(reducers,0);

  const positionPrixTotal = document.querySelector("#totalPrice");
  const structurePrixTotal = prixTotal;
  positionPrixTotal.innerHTML = structurePrixTotal;

//récupérer les valeurs du formulaire
const boutonFormulaire = document.querySelector("#order");
boutonFormulaire.addEventListener("click", (e) =>{
  e.preventDefault();
let formulaire = {
  prenom : document.querySelector("#firstName").value,
  nom : document.querySelector("#lastName").value,
  adresse : document.querySelector("#address").value,
  ville : document.querySelector("#city").value,
  email : document.querySelector("#email").value,
}
//Contrôle du prénom
const lePrenom = formulaire.prenom;
if(/^[A-Za-z]{3,20}$/.test(lePrenom)){
console.log("lePrenom");

}else{
 console.log("ko");
};



localStorage.setItem("formulaire", JSON.stringify(formulaire));

const aEnvoyerServeur = {
  produitEnregistre,
  formulaire,
}
})

const formulaireEnvoye = JSON.parse(localStorage.getItem("formulaire"));

document.querySelector("#firstName").value = formulaireEnvoye.prenom;
document.querySelector("#lastName").value = formulaireEnvoye.nom;
document.querySelector("#address").value = formulaireEnvoye.adresse;
document.querySelector("#city").value = formulaireEnvoye.ville;
document.querySelector("#email").value = formulaireEnvoye.email;

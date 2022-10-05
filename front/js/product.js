// I) Récupération de l'id dans L'url.

const queryString_url_id = window.location.search;

const urlSearchParams = new URLSearchParams(queryString_url_id);

const id = urlSearchParams.get("id");


// II) Extraction des informations d'un seul produit pour remplir la page.

fetch(`http://localhost:3000/api/products/${id}`)
.then(function (response) {
return response.json()
})
.then(function (informations) {
    informationProduit(informations);
    selectionProduit(informations);
console.log(informations);
})


//Gestion des données pour afficher les éléments sur la page

let informationProduit = (informations) => {

const positionImage = document.querySelector(".item__img ");
const positionTitre = document.querySelector("#title");
const positionPrix = document.querySelector("#price");
const positionDescription = document.querySelector("#description");
const positionTitrePage = document.querySelector("title");
const positionCouleur = document.querySelector("#colors");

const structureImage = `<img src=${informations.imageUrl}> `;
const structureTitre = `<h1>${informations.name}</h1>`;
const structurePrix = `${informations.price}`;
const structureDescription = `<p>${informations.description}</p>`;
const structureTitrePage = `${informations.name}`;

let structureCouleur = [];
for (i = 0; i < informations.colors.length; i++) {
    structureCouleur = structureCouleur +
    `<option value="${informations.colors[i]}">${informations.colors[i]}</option>`;
}

positionImage.innerHTML = structureImage;
positionTitre.innerHTML = structureTitre;
positionPrix.innerText = structurePrix;
positionDescription.innerHTML = structureDescription;
positionTitrePage.innerText = structureTitrePage;
positionCouleur.innerHTML += structureCouleur;
}



// III) Récupération des données sélectionnées par l'utilisateur.

const menuCouleur = document.querySelector("#colors");
const menuQuantite = document.querySelector("#quantity");

const boutonPanier = document.querySelector("#addToCart");
console.log(boutonPanier);

let selectionProduit = (informations) => {
boutonPanier.addEventListener("click", (event)=>{
event.preventDefault();  

const choixCouleur = menuCouleur.value;
const choixQuantite = menuQuantite.value;

if (menuCouleur.value == false) {
    (window.alert (`Veuillez sélectionner une couleur pour votre ${informations.name}`));
    window.location.href = "#colors";
  } else if (menuQuantite.value == 0) {
    (window.alert (` Veuillez sélectionner le nombre de ${informations.name} souhaités`));
    window.location.href = "#quantity";
  } else if (window.confirm (` Nous avons bien ajouté ${menuQuantite.value} ${informations.name}, couleur: "${menuCouleur.value}" à votre panier.
  Consultez le panier: OK ou Continuer votre shopping: ANNULER`)){
    window.location.href = "cart.html";
  }else{
    
  }
  


let ChoixUtilisateur = {
_id: id,
image: informations.imageUrl,
option_Couleur: choixCouleur,
option_Quantite: choixQuantite,
prix: informations.price,
nom: informations.name,
}
console.log(ChoixUtilisateur);



// Ajouter au local storage

let produitEnregistre = JSON.parse(localStorage.getItem("produit"));
console.log(produitEnregistre);


if(produitEnregistre === null){
    produitEnregistre = [];
    produitEnregistre.push(ChoixUtilisateur);
    localStorage.setItem("produit", JSON.stringify(produitEnregistre));
    console.log(produitEnregistre);
}
else{
    const found = produitEnregistre.find(element => element._id == ChoixUtilisateur._id && element.option_Couleur == ChoixUtilisateur.option_Couleur);
    console.log(found);
    if (found == undefined) {
        console.log(found)
    produitEnregistre.push(ChoixUtilisateur);
    localStorage.setItem("produit", JSON.stringify(produitEnregistre));
     }else{
      const quantiteEnregistre = parseInt(found.option_Quantite);
      console.log(quantiteEnregistre);
      const ajoutQuantite = parseInt (ChoixUtilisateur.option_Quantite);
      console.log(ajoutQuantite);
        found.option_Quantite = quantiteEnregistre + ajoutQuantite;
        console.log(found.option_Quantite);
        console.log(ChoixUtilisateur.option_Quantite)
        localStorage.setItem("produit", JSON.stringify(produitEnregistre));
    }
}
}
)}


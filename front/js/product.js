// récupération de la chaine de requête dans l'Url
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

// extraire id avec UrlSearchParams
const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);

//récupérer la chaine de caractère derrière le id de mon Url
const id = urlSearchParams.get("id");
console.log(id);

//affichage du produit qui a été sélectionné par l'id par fetch
//ajouter la valeur de l'id à la fin de l'Url
let informationUnObjet = fetch(`http://localhost:3000/api/products/${id}`)
.then(function (response) {
    return response.json()
})
.then(function (data) {
    console.log(data)


//Choix de l'endroit ou positionner l'élément dynamique
const positionImage = document.querySelector(".item__img ");
console.log(positionImage);
const positionTitre = document.querySelector("#title");
const positionPrix = document.querySelector("#price");
const positionDescription = document.querySelector("#description");
const positionTitrePage = document.querySelector("title");

const positionCouleur = document.querySelector("#colors");


//Contenu de l'élément dynamique
const structureImage = `<img src=${data.imageUrl}> `;
const structureTitre = `<h1>${data.name}</h1>`;
const structurePrix = `${data.price}`;
const structureDescription = `<p>${data.description}</p>`;
const structureTitrePage = `${data.name}`;



//Création d'une boucle 'for' pour remplir la zone de sélection de la couleur (utilisation de j à la place de i car déjà utilisé)
let structureCouleur = [];
for (i = 0; i < data.colors.length; i++) {
    structureCouleur = structureCouleur +
   `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
}

//Injection du contenu dynamique
positionImage.innerHTML = structureImage;
positionTitre.innerHTML = structureTitre;
positionPrix.innerText = structurePrix;
positionDescription.innerHTML = structureDescription;
positionTitrePage.innerText = structureTitrePage;

positionCouleur.innerHTML = structureCouleur;

})
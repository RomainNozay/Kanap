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



const positionImage = document.querySelector(".item__img ");
console.log(positionImage);
const positionTitre = document.querySelector("#title");
const positionPrix = document.querySelector("#price");
const positionDescription = document.querySelector("#description");

const structureImage = `<img src=${data.imageUrl}> `;
const structureTitre = `<h1>${data.name}</h1>`;
const structurePrix = `<p>${data.price}</p>`;
const structureDescription = `<p>${data.description}</p>`;


positionImage.innerHTML = structureImage;
positionTitre.innerHTML = structureTitre;
positionPrix.innerHTML = structurePrix;
positionDescription.innerHTML = structureDescription;
})
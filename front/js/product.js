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

const structureImage = `<img src=${data.imageUrl}> `;

positionImage.innerHTML = structureImage;
})
// récupération de la chaine de requête dans l'Url
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

// extraire id avec UrlSearchParams
const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);

//récupérer la chaine de caractère derrière le id de mon Url
const id = urlSearchParams.get("id");
console.log(id);
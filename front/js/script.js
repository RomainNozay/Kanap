// Récupération des données de tout les canapés depuis l'API. (explication de fetch avec get)
fetch("http://localhost:3000/api/products")
  .then(function (reponse) {
    if (reponse.ok) {
      return reponse.json();
    }
  })
  //Création d'une liste de produit depuis L'API
  .then(function (products) {
    // Génération de contenu afin de remplir automatiquement les "card" destinés à recevoir les canapés, à partir de la fonction products qui fourni les informations.
    for (let product of products) {
      let i = 0; i < product.length; i++;
      function formeDeIndex(){
      document.getElementById("items").innerHTML +=
        `<a href="./product.html?id=${product._id}">                                              
            <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">                                              
            <h3 class="productName">${product.name}</h3>                                                
            <p class="productDescription">${product.description}</p>                                           
            </article>                                              
            </a>`
      }
      formeDeIndex();
    }
  })
  // En cas d'échec de récupération des données de l'Api
  .catch(function (error) {
    console.log(error);
  });




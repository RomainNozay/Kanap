function carteDeCanape(_id, imageUrl, altTxt, name, description) {
  document.getElementById("items").innerHTML +=
    `<a href="./product.html?id=${_id}">                                              
      <article>
      <img src="${imageUrl}" alt="${altTxt}">                                              
      <h3 class="productName">${name}</h3>                                                
      <p class="productDescription">${description}</p>                                    
      </article>                                              
      </a>`;
}

// Récupération des données de tout les canapés depuis l'API, puis création d'une liste de produit depuis L'API.
// Génération de contenu afin de remplir automatiquement les "card" destinés à recevoir les canapés, à partir de la fonction products qui fourni les informations.
fetch("http://localhost:3000/api/products")
  .then(function (reponse) {
    if (reponse.ok) {
      return reponse.json();
    }
  })
  .then(function (products) {
    for (let product of products) {
      carteDeCanape(product._id, product.imageUrl, product.altTxt, product.name, product.description);
    }
  })
  .catch(function (error) {
    console.log(error);
  });

  



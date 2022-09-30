
// Apparition du catalogue des canapés sur la page principale.

// I) Récupération des données de tout les canapés du Dom. (explication de fetch avec get)

// 1) Utilisation fetch pour récupérer (get par défaut) les données de l'API.
  fetch("http://localhost:3000/api/products")

  // 2) Traitement de la réponse en la transformant en fichier json.
  .then(function (reponse) {
    if (reponse.ok) {
      return reponse.json();
    }
  })
  // 3) Création d'une fonction "products".
        .then(function(products) {

  // II) Génération de contenu afin de remplir automatiquement les "card" destinés à recevoir les canapés, à partir de la fonction products qui fourni les informations.

  // 1) Utilisation de la boucle for... of pour automatiser la création des "card".
        for(let product of products) {
          let i = 0; i < product.length; i++;

  // 2) Sélectionner de la balise "items" (getElementById) sur laquelle fixer notre structure Html (grâce à inner.html). Le "+" avant le '=' est la pour créer un nouvel élément à chaque itération.
          document.getElementById("items").innerHTML += 

  // 3) Création de chaque vignette en récupérant les information nécessaire dans le Dom et en le renseignant dans les bonnes balise, elle même correctement concaténé.
  // 3.1)Création du lien unique de chaque produit grâce au début fixe du lien auquel on ajoute l'id de chaque produit.
          `<a href="./product.html?id=${product._id}">
                                                          
          <article>

          <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                            
          <h3 class="productName">${product.name}</h3>
                                                            
          <p class="productDescription">${product.description}</p>
                                                          
          </article>
                                                        
          </a>`
        }
      })
      //fin de la fonction

      // En cas d'échec de récupération des données de l'Api
      .catch(function(error) {
        console.log(error);
      });

      
    

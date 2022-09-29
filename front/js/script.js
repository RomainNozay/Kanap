


// Utiliser fetch pour récupérer (get par défaut) les données de l'API
fetch("http://localhost:3000/api/products")

// Traiter la réponse en transformant cette dernière en fichier json
    .then(reponse => reponse.json())
    
//Création d'une fonction "products"
        .then(function(products) {
        
//Utilisation de la boucle for... of pour afficher les objets dans la page
        for(let product of products) {
          let i = 0; i < product.length; i++;

//Attacher la structure HTML (grâce à inner.HTML) à l'id "items" (grâce à getElementById), le "+" est la pour créer un nouvel élément à chaque itération.
          document.getElementById("items").innerHTML += 

//Création de cjaque vignette en récupérant les information nécessaire dans le Dom et en le renseignant dans les bonnes balise, elle même correctement concaténé.
//Créer lien avec début du lien fixe et ajout de chaque produit à la fin (créer des pages uniques pour chaque produit).
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

      
    

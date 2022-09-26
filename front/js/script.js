fetch("http://localhost:3000/api/products")
    .then(reponse => reponse.json())
    
    
    .then(function(products) {
        
        for(let product of products) {
          let i = 0; i < product.length; i++;
          document.getElementById("items").innerHTML += `<a href="./product.html?id=${product._id}">
                                                          <article>
                                                            <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                            <h3 class="productName">${product.name}</h3>
                                                            <p class="productDescription">${product.description}</p>
                                                          </article>
                                                        </a>`
        }
      })

      
    

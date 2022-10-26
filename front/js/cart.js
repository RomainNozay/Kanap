function ligneDuPanier(_id, option_Couleur, image, nom, price, option_Quantite) {
  document.getElementById('cart__items').innerHTML +=
    `
  <article class="cart__item" data-id="${_id}" data-color="${option_Couleur}">
              <div class="cart__item__img">
                <img src="${image}" alt="Photographie d'un canapé">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${nom}</h2>
                  <p>${option_Couleur}</p>
                  <p>${price} €</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté :  </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" canapeId="${_id}" canapeCouleur="${option_Couleur}" value="${option_Quantite}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem" canapeId="${_id}" canapeCouleur="${option_Couleur}" >Supprimer</p>
                  </div>
                </div>
              </div>
            </article>
              `;
}

// Récupération des produits de l'API
async function getProductById(productId) {
  return fetch("http://localhost:3000/api/products/" + productId)
    .then(function (res) {
      return res.json();
    })
    .catch((err) => {
      // Erreur serveur
      console.log("erreur");
    })
    .then(function (response) {
      return response;
    });
}
/////////////////////////////////////////////////////////////////////////////////////////////////
async function AffichagePanier() {

  let produitEnregistre = JSON.parse(localStorage.getItem("panier"));
  for (k = 0; k < produitEnregistre.length; k++) {
    const product = await getProductById(produitEnregistre[k]._id);
    ligneDuPanier(produitEnregistre[k]._id, produitEnregistre[k].option_Couleur, produitEnregistre[k].image, produitEnregistre[k].nom
      , product.price, produitEnregistre[k].option_Quantite);
    //////////////////////////////////////////////////////////////////////////////////////////////
    totalPrix = 0;
    for (i = 0; i < produitEnregistre.length; i++) {
      let article = await getProductById(produitEnregistre[i]._id);
      totalPrix += produitEnregistre[i].option_Quantite * article.price;
    }
    document.getElementById('totalPrice').innerText = totalPrix;
    ////////////////////////////////////////////////////////////////////////////////////////////
    function totaleQuantite() {
      let listeQuantitePanier = [];

      for (i = 0; i < produitEnregistre.length; i++) {
        let QuantiteChaquePanier = produitEnregistre[i].option_Quantite;
        let quantiteNombre = parseInt(QuantiteChaquePanier);

        listeQuantitePanier.push(quantiteNombre);
      }

      const reducer = (accumulator, quantite) => accumulator + quantite;
      const quantiteTotal = listeQuantitePanier.reduce(reducer, 0);

      document.getElementById('totalQuantity').innerText = quantiteTotal;
    }
    /////////////////////////////////////////////////////////////////////////////////////////////
    function ModificationQuantiteProduit() {
      let bouttonQuantitePanier = document.querySelectorAll(".itemQuantity");
      for (l = 0; l < bouttonQuantitePanier.length; l++) {

        bouttonQuantitePanier[l].addEventListener("change", (e) => {
          e.preventDefault();

          let nouveauChoix = e.target.value;
          let idChoisi = e.target.getAttribute("canapeId");
          let couleurChoisi = e.target.getAttribute("canapeCouleur");
          let nouveau = JSON.parse(localStorage.getItem("panier"));

          nouveau = nouveau.map((item, index) => {
            if (item._id === idChoisi && item.option_Couleur === couleurChoisi) {
              item.option_Quantite = nouveauChoix;
            }
            return item;
          });
          let nouveauProduitEnregistre = JSON.stringify(nouveau);
          localStorage.setItem("panier", nouveauProduitEnregistre);
          location.reload();
        })
      }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////  
    function SuppressionArticle() {
      let bouttonSupprimer = document.querySelectorAll(".deleteItem");
      for (i = 0; i < bouttonSupprimer.length; i++) {

        bouttonSupprimer[i].addEventListener("click", e => {

          let canapeId = e.target.getAttribute("canapeId");

          let canapeCouleur = e.target.getAttribute("canapeCouleur");

          const rechercheElementSupprimer = produitEnregistre.find(element => element._id == canapeId &&
            element.option_Couleur == canapeCouleur);

          produitEnregistre = produitEnregistre.filter(el => el != rechercheElementSupprimer);
          localStorage.setItem("panier", JSON.stringify(produitEnregistre));
          window.location.href = "cart.html";
        })
      }
    }
  }
  totaleQuantite();
  ModificationQuantiteProduit();
  SuppressionArticle();
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function recuperationInformationFormulaire() {
  const boutonFormulaire = document.querySelector("#order");
  boutonFormulaire.addEventListener("click", (e) => {
    e.preventDefault();

    let contact = {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email: document.querySelector("#email").value,
    }

    const regexLettre = (value) => {
      return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value);
    }
    const messageErreur = "Veuillez remplir cette zone, merci."

    function prenomControle() {
      const lePrenom = contact.firstName;
      if (regexLettre(lePrenom)) {
        document.querySelector("#firstNameErrorMsg").textContent = "";
        return true;

      } else {
        document.querySelector("#firstNameErrorMsg").textContent = messageErreur;
      }
    }

    function nomControle() {
      const lenom = contact.lastName;
      if (regexLettre(lenom)) {
        document.querySelector("#lastNameErrorMsg").textContent = "";
        return true;

      } else {
        document.querySelector("#lastNameErrorMsg").textContent = messageErreur;
        return false;
      }
    }

    function villeControle() {
      const laVille = contact.city;
      if (regexLettre(laVille)) {
        document.querySelector("#cityErrorMsg").textContent = "";
        return true;

      } else {
        document.querySelector("#cityErrorMsg").textContent = messageErreur;
        return false;
      }
    }

    function adresseControle() {
      const laAdresse = contact.address;
      if (/^[A-Za-z0-9\s]{3,100}$/.test(laAdresse)) {
        document.querySelector("#addressErrorMsg").textContent = "";
        return true;

      } else {
        document.querySelector("#addressErrorMsg").textContent = messageErreur;
        return false;
      }
    }

    function emailControle() {
      const leEmail = contact.email;
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(leEmail)) {
        document.querySelector("#emailErrorMsg").textContent = "";
        return true;

      } else {
        document.querySelector("#emailErrorMsg").textContent = messageErreur;
        return false;
      }
    }

    if (prenomControle() && nomControle() && adresseControle() && villeControle() && emailControle()) {
      localStorage.setItem("contact", JSON.stringify(contact));

      envoieAuServeur(contact);

    } else { }
  })
}
////////////////////////////////////////////////////////////////////////////////////////////
function envoieAuServeur(contact) {
  const products = [];
  const envoieAuServeur = fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify({ contact, products }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  envoieAuServeur.then(async (response) => {
    try {
      const contenu = await response.json();
      localStorage.setItem("idDeCommande", contenu.orderId);
      window.location.href = "confirmation.html";
    } catch (e) {
      console.log(e);
    }
  })
}
/////////////////////////////////////////////////////////////////////////////////////////
function remplissageFormulaireLocalStorage() {

  const contact = JSON.parse(localStorage.getItem("contact"));
  if (contact === null) {

  } else {
    document.querySelector("#firstName").value = contact.firstName;
    document.querySelector("#lastName").value = contact.lastName;
    document.querySelector("#address").value = contact.address;
    document.querySelector("#city").value = contact.city;
    document.querySelector("#email").value = contact.email;

  }
}
/////////////////////////////////////////////////////////////////////////////////////////
AffichagePanier();
recuperationInformationFormulaire();
remplissageFormulaireLocalStorage();
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




//let produitEnregistre = JSON.parse(localStorage.getItem("panier"));
//console.log(produitEnregistre);

async function AffichagePanier() {
  const positionPanier = document.querySelector("#cart__items");
  let structurePanier = [];

  let produitEnregistre = JSON.parse(localStorage.getItem("panier"));
  //console.log(produitEnregistre);

  for (k = 0; k < produitEnregistre.length; k++) {
    const product = await getProductById(produitEnregistre[k]._id);
    //console.log(product.price);
    structurePanier = structurePanier +
      `
    <article class="cart__item" data-id="${produitEnregistre[k]._id}" data-color="${produitEnregistre[k].option_Couleur}">
                <div class="cart__item__img">
                  <img src="${produitEnregistre[k].image}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${produitEnregistre[k].nom}</h2>
                    <p>${produitEnregistre[k].option_Couleur}</p>
                    <p>${product.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :  </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" canapeId="${produitEnregistre[k]._id}" canapeCouleur="${produitEnregistre[k].option_Couleur}" value="${produitEnregistre[k].option_Quantite}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" canapeId="${produitEnregistre[k]._id}" canapeCouleur="${produitEnregistre[k].option_Couleur}" >Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
              `
    if (k === produitEnregistre.lenght); {
      positionPanier.innerHTML = structurePanier;
    }
  
    let listeSousTotaux = [];

    //for (i = 0; i < produitEnregistre.length; i++) {
      let QuantiteChaquePanier = produitEnregistre[k].option_Quantite;
      
      let PrixChaquePanier = product.price;
      const PrixChaquePanierNombre = parseInt(PrixChaquePanier);
      let TotalChaqueLigne = QuantiteChaquePanier * PrixChaquePanierNombre;
      
      listeSousTotaux.push(TotalChaqueLigne);
      console.log(listeSousTotaux);
    //}

    const reducers = (accumulator, prix) => accumulator + prix;
    const prixTotal = listeSousTotaux.reduce(reducers, 0);

    const positionPrixTotal = document.querySelector("#totalPrice");
    const structurePrixTotal = prixTotal;
    positionPrixTotal.innerHTML = structurePrixTotal;
  }
  /////////////////////////////////////////////////////////////////////////////////////////
  let listeQuantitePanier = [];

  for (i = 0; i < produitEnregistre.length; i++) {
    let QuantiteChaquePanier = produitEnregistre[i].option_Quantite;
console.log(QuantiteChaquePanier);
    const QuantiteNombre = parseInt(QuantiteChaquePanier);

    listeQuantitePanier.push(QuantiteNombre);
    console.log(listeQuantitePanier);
  }

  const reducer = (accumulator, Quantite) => accumulator + Quantite;
  const quantiteTotal = listeQuantitePanier.reduce(reducer, 0);

  const positionQuantite = document.querySelector("#totalQuantity");
  const structureQuantitePanier = quantiteTotal;
  positionQuantite.innerHTML = structureQuantitePanier;

  ///////////////////////////////////////////////////////////////////////////////////////////

  function ModificationQuantiteProduit() {
    let bouttonQuantitePanier = document.querySelectorAll(".itemQuantity");
    for (l = 0; l < bouttonQuantitePanier.length; l++) {

      bouttonQuantitePanier[l].addEventListener("change", (e) => {
        e.preventDefault();

        let nouveauChoix = e.target.value;
        let idChoisi = e.target.getAttribute("canapeId");
        console.log(idChoisi);
        let couleurChoisi = e.target.getAttribute("canapeCouleur");
        console.log(couleurChoisi);
        let nouveau = JSON.parse(localStorage.getItem("panier"));
        console.log(nouveau);

        nouveau = nouveau.map((item, index) => {
          if (item._id === idChoisi && item.option_Couleur === couleurChoisi) {
            item.option_Quantite = nouveauChoix;
          }
          return item;
        });
        let nouveauProduitEnregistre = JSON.stringify(nouveau);
        localStorage.setItem("panier", nouveauProduitEnregistre);
        console.log(nouveauProduitEnregistre);
        location.reload();
      })
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////  

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
  ModificationQuantiteProduit();
  SuppressionArticle();

}

function recuperationInformationFormulaire() {
  const boutonFormulaire = document.querySelector("#order");
  boutonFormulaire.addEventListener("click", (e) => {
    e.preventDefault();
    let formulaire = {
      prenom: document.querySelector("#firstName").value,
      nom: document.querySelector("#lastName").value,
      adresse: document.querySelector("#address").value,
      ville: document.querySelector("#city").value,
      email: document.querySelector("#email").value,
    }
    //const regexLettre = (value) => {
    //return /^[A-Za-z]{3,20}$/.test(value);
    //}
    //function texteErreurLettre(){document.querySelector("#firstNameErrorMsg").textContent = "Veuillez remplir cette zone sans chiffres ni caractères spéciaux.";}
    function prenomControle() {
      const lePrenom = formulaire.prenom;
      if (/^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(lePrenom)) {
        document.querySelector("#firstNameErrorMsg").textContent = "";
        return true;

      } else {
        document.querySelector("#firstNameErrorMsg").textContent = "Veuillez remplir cette zone sans chiffres ni caractères spéciaux.";
        return false;
      }
    }

    function nomControle() {
      const lenom = formulaire.nom;
      if (/^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(lenom)) {
        document.querySelector("#lastNameErrorMsg").textContent = "";
        return true;

      } else {
        document.querySelector("#lastNameErrorMsg").textContent = "Veuillez remplir cette zone sans chiffres ni caractères spéciaux.";
        return false;
      }
    }

    function villeControle() {
      const laVille = formulaire.ville;
      if (/^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(laVille)) {
        document.querySelector("#cityErrorMsg").textContent = "";
        return true;

      } else {
        document.querySelector("#cityErrorMsg").textContent = "Veuillez remplir cette zone sans chiffres ni caractères spéciaux.";
        return false;
      }
    }

    function adresseControle() {
      const laAdresse = formulaire.adresse;
      if (/^[A-Za-z0-9\s]{3,100}$/.test(laAdresse)) {
        document.querySelector("#addressErrorMsg").textContent = "";
        return true;

      } else {
        document.querySelector("#addressErrorMsg").textContent = "Veuillez renseigner votre adresse sans caractères spéciaux.";
        return false;
      }
    }

    function emailControle() {
      const leEmail = formulaire.email;
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(leEmail)) {
        document.querySelector("#emailErrorMsg").textContent = "";
        return true;

      } else {
        document.querySelector("#emailErrorMsg").textContent = "Veuillez renseigner une adresse mail valide.";
        return false;
      }
    }


    if (prenomControle() && nomControle() && villeControle() && adresseControle() && emailControle()) {
      localStorage.setItem("formulaire", JSON.stringify(formulaire));
    } else {
      alert("attention")
    }

    let produitEnregistre = JSON.parse(localStorage.getItem("panier"));
    const aEnvoyerServeur = {
      produitEnregistre,
      formulaire,
    }
  })
}

function remplissageFormulaireLocalStorage() {
  const formulaireEnvoye = JSON.parse(localStorage.getItem("formulaire"));

  document.querySelector("#firstName").value = formulaireEnvoye.prenom;
  document.querySelector("#lastName").value = formulaireEnvoye.nom;
  document.querySelector("#address").value = formulaireEnvoye.adresse;
  document.querySelector("#city").value = formulaireEnvoye.ville;
  document.querySelector("#email").value = formulaireEnvoye.email;
}

AffichagePanier();
recuperationInformationFormulaire();
remplissageFormulaireLocalStorage();

// I) Récupération de l'id dans L'url.
const queryString_url_id = window.location.search;
const urlSearchParams = new URLSearchParams(queryString_url_id);
const idProduit = urlSearchParams.get("id");

// II) Extraction des informations d'un seul produit pour remplir la page.
fetch(`http://localhost:3000/api/products/${idProduit}`)
  .then(function (response) {
    return response.json()
  })
  .then(function (informations) {
    affichageDuProduit(informations);
    créationDuLocalStorage(informations);
  })
  
//Gestion des données pour afficher les éléments sur la page
let affichageDuProduit = (informations) => {

  const positionImage = document.querySelector(".item__img ");
  const positionTitre = document.querySelector("#title");
  const positionPrix = document.querySelector("#price");
  const positionDescription = document.querySelector("#description");
  const positionTitrePage = document.querySelector("title");
  const positionCouleur = document.querySelector("#colors");

  const structureImage = `<img src=${informations.imageUrl}> <alt =${informations.altTxt}>`;
  const structureTitre = `<h1>${informations.name}</h1>`;
  const structurePrix = `${informations.price}`;
  const structureDescription = `<p>${informations.description}</p>`;
  const structureTitrePage = `${informations.name}`;

  let structureCouleur = [];
  for (i = 0; i < informations.colors.length; i++) {
    structureCouleur = structureCouleur +
      `<option value="${informations.colors[i]}">${informations.colors[i]}</option>`;
  }

  positionImage.innerHTML = structureImage;
  positionTitre.innerHTML = structureTitre;
  positionPrix.innerText = structurePrix;
  positionDescription.innerHTML = structureDescription;
  positionTitrePage.innerText = structureTitrePage;
  positionCouleur.innerHTML += structureCouleur;
}

// III) Récupération des données sélectionnées par l'utilisateur.
const menuCouleur = document.querySelector("#colors");
const menuQuantite = document.querySelector("#quantity");
const boutonPanier = document.querySelector("#addToCart");

let créationDuLocalStorage = (informations) => {
  boutonPanier.addEventListener("click", (event) => {
    event.preventDefault();

    const choixCouleur = menuCouleur.value;
    const choixQuantite = menuQuantite.value;
    const choixQuantiteNombre = parseInt(choixQuantite);

    if (menuCouleur.value == false) {
      window.location.href = "#colors";
    } else if (menuQuantite.value == 0) {
      window.location.href = "#quantity";
    } else {

      let ChoixUtilisateur = {
        _id: idProduit,
        image: informations.imageUrl,
        option_Couleur: choixCouleur,
        option_Quantite: choixQuantiteNombre,
        nom: informations.name,
      }

      function ajoutAuLocalStorage() {
        let produitEnregistre = JSON.parse(localStorage.getItem("panier"));
        const enregistrementLocalStorage = (value) => {
          return localStorage.setItem("panier", JSON.stringify(produitEnregistre));;
        }
        if (produitEnregistre === null) {
          produitEnregistre = [];
          produitEnregistre.push(ChoixUtilisateur);
          enregistrementLocalStorage();
        }
        else {
          const optionTrouver = produitEnregistre.find(element => element._id == ChoixUtilisateur._id && element.option_Couleur == ChoixUtilisateur.option_Couleur);
          if (optionTrouver == undefined) {
            produitEnregistre.push(ChoixUtilisateur);
            enregistrementLocalStorage();
          } else {
            optionTrouver.option_Quantite = optionTrouver.option_Quantite + ChoixUtilisateur.option_Quantite;
            enregistrementLocalStorage();
          }
        }
      }
      ajoutAuLocalStorage();
    }
  })
}


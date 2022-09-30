
// I) Récupération de l'id dans L'url.

    // 1) Récupération de la chaine de requête dans l'Url.
    const queryString_url_id = window.location.search;
    console.log(queryString_url_id);

    // 2) Extraction de l'id de la chaîne de requête avec UrlSearchParams.
    const urlSearchParams = new URLSearchParams(queryString_url_id);
    console.log(urlSearchParams);

    // 3) Récupération de la chaine de caractère derrière le id de mon Url.
    const id = urlSearchParams.get("id");
    console.log(id);

// II) Extraction des informations d'un seul produit pour remplir la page.

    // 1) Utilisation d'une requête fetch (get) pour aller récupérer les paires "clé-valeur" seulement d'un canapé en ajoutant son id (de manière dynamique) à la fin de la requête. 
    let informationUnObjet = fetch(`http://localhost:3000/api/products/${id}`)
    .then(function (response) {
    return response.json()
    })
    .then(function (informations) {
        informationProduit(informations);
        selectionProduit(informations);
    console.log(informations);
    })


    let informationProduit = (informations) => {

    // 2) Choix de l'endroit ou positionner l'élément dynamique
    const positionImage = document.querySelector(".item__img ");
    const positionTitre = document.querySelector("#title");
    const positionPrix = document.querySelector("#price");
    const positionDescription = document.querySelector("#description");
    const positionTitrePage = document.querySelector("title");
    const positionCouleur = document.querySelector("#colors");

    // 3) Contenu de l'élément dynamique
    const structureImage = `<img src=${informations.imageUrl}> `;
    const structureTitre = `<h1>${informations.name}</h1>`;
    const structurePrix = `${informations.price}`;
    const structureDescription = `<p>${informations.description}</p>`;
    const structureTitrePage = `${informations.name}`;

    // 3.1) Création d'une boucle 'for' pour remplir la zone de sélection de la couleur
    let structureCouleur = [];
    for (i = 0; i < informations.colors.length; i++) {
        structureCouleur = structureCouleur +
        //écriture alternative de structureCouleur +=.
        `<option value="${informations.colors[i]}">${informations.colors[i]}</option>`;
    }

    // 4) Injection du contenu dynamique.
    positionImage.innerHTML = structureImage;
    positionTitre.innerHTML = structureTitre;
    positionPrix.innerText = structurePrix;
    positionDescription.innerHTML = structureDescription;
    positionTitrePage.innerText = structureTitrePage;
    positionCouleur.innerHTML += structureCouleur;
                        //le '+' ici permet de conserver le "svp,choisissez une couleur".
    }



// III) Récupération des données sélectionnées par l'utilisateur.

    // 1) Sélection de la source des informations intéractives.
    const menuCouleur = document.querySelector("#colors");
    const menuQuantite = document.querySelector("#quantity");
    

    // 2) Sélection du bouton ajouter au panier.
    const boutonPanier = document.querySelector("#addToCart");
    console.log(boutonPanier);

    let selectionProduit = (informations) => {
    // 3) Ecouter le bouton et envoyer le panier.
    boutonPanier.addEventListener("click", (event)=>{
    event.preventDefault();  

    if (menuCouleur.value == false) {
        confirm("Veuillez sélectionner une couleur");
      } else if (menuQuantite.value == 0) {
        confirm("Veuillez sélectionner le nombre d'articles souhaités");
      } else {
        alert("Votre article a bien été ajouté au panier");


    // 3.1) Insertion des choix de l'utilisateur dans un variable.
    const choixCouleur = menuCouleur.value;
    const choixQuantite = menuQuantite.value;


    // 3.2) Récupération des valeurs du formulaire sous forme de tableau clé/valeur (objet).
    let ChoixUtilisateur = {
    _id: id,
    image: informations.imageUrl,
    option_Couleur: choixCouleur,
    option_Quantite: choixQuantite,
    prix: informations.price,
    nom: informations.name,
    }
    console.log(ChoixUtilisateur);
    }
    });



    }
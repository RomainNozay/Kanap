
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
    .then(function (data) {
    console.log(data)


    // 2) Choix de l'endroit ou positionner l'élément dynamique
    const positionImage = document.querySelector(".item__img ");
    const positionTitre = document.querySelector("#title");
    const positionPrix = document.querySelector("#price");
    const positionDescription = document.querySelector("#description");
    const positionTitrePage = document.querySelector("title");
    const positionCouleur = document.querySelector("#colors");

    // 3) Contenu de l'élément dynamique
    const structureImage = `<img src=${data.imageUrl}> `;
    const structureTitre = `<h1>${data.name}</h1>`;
    const structurePrix = `${data.price}`;
    const structureDescription = `<p>${data.description}</p>`;
    const structureTitrePage = `${data.name}`;

    // 3.1) Création d'une boucle 'for' pour remplir la zone de sélection de la couleur (utilisation de j à la place de i car déjà utilisé)
    let structureCouleur = [];
    for (i = 0; i < data.colors.length; i++) {
    structureCouleur = structureCouleur +
    //écriture alternative de structureCouleur +=.
    `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
    }

    // 4) Injection du contenu dynamique.
    positionImage.innerHTML = structureImage;
    positionTitre.innerHTML = structureTitre;
    positionPrix.innerText = structurePrix;
    positionDescription.innerHTML = structureDescription;
    positionTitrePage.innerText = structureTitrePage;
    positionCouleur.innerHTML += structureCouleur;
                        //le '+' ici permet de conserver le "svp,choisissez une couleur".

// III) Récupération des données sélectionnées par l'utilisateur.

    // 1) Sélection de la source des informations intéractives.
    const menuCouleur = document.querySelector("#colors");
    const menuQuantite = document.querySelector("#quantity");
    

    // 2) Sélection du bouton ajouter au panier.
    const boutonPanier = document.querySelector("#addToCart");
    console.log(boutonPanier);

    // 3) Ecouter le bouton et envoyer le panier.
    boutonPanier.addEventListener("click", (event)=>{
    event.preventDefault();  


    // 3.1) Insertion des choix de l'utilisateur dans un variable.
    const choixCouleur = menuCouleur.value;
    const choixQuantite = menuQuantite.value;


    // 3.2) Récupération des valeurs du formulaire sous forme de tableau clé/valeur (objet).
    let ChoixUtilisateur = {
    _id: id,
    image: data.imageUrl,
    option_Couleur: choixCouleur,
    option_Quantite: choixQuantite,
    prix: data.price,
    nom: data.name,
    }
    console.log(ChoixUtilisateur);
    });



    })
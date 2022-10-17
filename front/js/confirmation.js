let idCommande = localStorage.getItem("idDeCommande");
console.log(idCommande)

positionIdCommande = document.querySelector("#orderId");
structureIdCommande = idCommande;
positionIdCommande.innerHTML = structureIdCommande;

function enleverCléLocalStorage(cle){
    localStorage.removeItem(cle);
};

enleverCléLocalStorage("panier");
enleverCléLocalStorage("idDeCommande");
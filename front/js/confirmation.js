let idCommande = localStorage.getItem("idDeCommande");
console.log(idCommande)

positionIdCommande = document.querySelector("#orderId");
structureIdCommande = idCommande;
positionIdCommande.innerHTML = structureIdCommande;

function enleverCleLocalStorage(cle){
    localStorage.removeItem(cle);
};

enleverCleLocalStorage("panier");
enleverCleLocalStorage("idDeCommande");
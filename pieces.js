// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();
// Récupération de l'élément du DOM qui accueillera les fiches
const sectionFiches = document.querySelector(".fiches");

for (let i = 0; i < pieces.length; i++) {

    const article = pieces[i];
    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");
    // Création des balises 
    const imageElement = document.createElement("img");
    imageElement.src = article.image;
    const nomElement = document.createElement("h2");
    nomElement.innerText = article.nom;
    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
    const stockElement = document.createElement("p");
    stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
    
    // On rattache la balise article a la section Fiches
    sectionFiches.appendChild(pieceElement);
    // On rattache l’image à pieceElement (la balise article)
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    //Ajout des éléments au DOM pour l'exercice
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(stockElement);

 }

 // Tri/prix
const boutonTrier = document.querySelector(".btn-trier")
boutonTrier.addEventListener("click", () => {
    const piecesOrdonnees = Array.from(pieces)
    piecesOrdonnees.sort((a, b) => {
        return a.prix - b.prix
     })
     console.log(piecesOrdonnees)
});

//Filtres
const boutonFiltrer = document.querySelector(".btn-filtrer")
boutonFiltrer.addEventListener("click", () => {
   const piecesFiltrees = pieces.filter((piece) => { return piece.prix <= 35 })
   console.log(piecesFiltrees)
})

//Tri decroissant
const boutonDecroissant = document.querySelector(".btn-decroissant");

boutonDecroissant.addEventListener("click", () => {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort( (a, b) => {
        return b.prix - a.prix;
     });
     console.log(piecesOrdonnees);
});

//Filtre par catégorie
const boutonNoDescription = document.querySelector(".btn-nodesc");

boutonNoDescription.addEventListener("click", () => {
    const piecesFiltrees = pieces.filter( (piece) => {
        return piece.description
    });
   console.log(piecesFiltrees)
});

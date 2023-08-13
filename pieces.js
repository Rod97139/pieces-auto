// Récupération des pièces depuis le fichier JSON
const pieces = await fetch("pieces-autos.json").then(pieces => pieces.json());
 
const sectionFiches = document.querySelector(".fiches");
// Fonction qui génère toute la page web
const genererPieces = (pieces) => {
  for (let i = 0; i < pieces.length; i++) {
    const article = pieces[i];
    // Création d’une balise dédiée à une pièce auto
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

     const avisBouton = document.createElement("button");
     avisBouton.dataset.id = article.id;
     avisBouton.textContent = "Afficher les avis";
    
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

    
    pieceElement.appendChild(avisBouton);
    

  }
 
}
 
// Premier affichage de la page
genererPieces(pieces);
 
// Ajout du listener pour trier les pièces par ordre de prix croissant
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", () => {
   const piecesOrdonnees = Array.from(pieces)
   piecesOrdonnees.sort((a, b) => {
       return a.prix - b.prix;
   });
  // Effacement de l'écran et regénération de la page
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesOrdonnees);
});
 
// Ajout du listener pour filtrer les pièces non abordables
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", () => {
   const piecesFiltrees = pieces.filter((piece) => {
       return piece.prix <= 35;
   });
   // Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesFiltrees);
});


//Tri decroissant
const boutonDecroissant = document.querySelector(".btn-decroissant");

boutonDecroissant.addEventListener("click", () => {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort( (a, b) => {
        return b.prix - a.prix;
     });
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});

//Filtre par catégorie
const boutonNoDescription = document.querySelector(".btn-nodesc");

boutonNoDescription.addEventListener("click", () => {
    const piecesFiltrees = pieces.filter( (piece) => {
        return piece.description
    });
    // Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

// Tableau des noms des pièces
const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length -1 ; i >= 0; i--){
    if(pieces[i].prix > 35){
        noms.splice(i,1);
    }
}
console.log(noms)

//Création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < noms.length ; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement);
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables')
    .appendChild(abordablesElements)

//Code Exercice 
const nomsDisponibles = pieces.map(piece => piece.nom);
const prixDisponibles = pieces.map(piece => piece.prix);

for(let i = pieces.length -1 ; i >= 0; i--){
    if(pieces[i].disponibilite === false){
        nomsDisponibles.splice(i,1);
        prixDisponibles.splice(i,1);
    }
}

const disponiblesElement = document.createElement('ul');

for(let i=0 ; i < nomsDisponibles.length ; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`;
    disponiblesElement.appendChild(nomElement);
}

document.querySelector('.disponibles').appendChild(disponiblesElement);

const inputPrixMax = document.querySelector('#prix-max')
inputPrixMax.addEventListener('input', () =>{
    const piecesFiltrees = pieces.filter((piece) =>{
        return piece.prix <= inputPrixMax.value;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);  
})
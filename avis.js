export const ajoutListenersAvis = () => {
    const piecesElements = document.querySelectorAll(".fiches article button");

    for (let i = 0; i < piecesElements.length; i++) {
      piecesElements[i].addEventListener("click", async (event) => {
        const id = event.target.dataset.id;

        //tester si les avis sont déja present dans le localStorage
            let avis = window.localStorage.getItem(`avis-piece-${id}`);
            if (avis === null) {
              /* Code de récupération des pièces depuis l’API HTTP */
              avis = await fetch("http://localhost:8081/pieces/" + id + "/avis").then(avis => avis.json());

              // Transformation des pièces en JSON
              const valeurAvis = JSON.stringify(avis);
              // Stockage des informations dans le localStorage
              window.localStorage.setItem(`avis-piece-${id}`, valeurAvis);
            }else{
                avis = JSON.parse(avis);
            }


        const pieceElement = event.target.parentElement;

        afficherAvis(pieceElement, avis)

        
      });
    }
}

export const afficherAvis = (pieceElement, avis) => {
    const avisElement = document.createElement("p");
    for (let i = 0; i < avis.length; i++) {
        avisElement.innerHTML += `<b>${avis[i].utilisateur}:</b> ${avis[i].commentaire} <br>`;
    }
    pieceElement.appendChild(avisElement);
}

export const ajoutListenerEnvoyerAvis = () => {
  const formulaireAvis = document.querySelector(".formulaire-avis");
  formulaireAvis.addEventListener("submit", (event) => {

    event.preventDefault();

    // Création de l’objet du nouvel avis.
    const avis = {
      pieceId: parseInt(event.target.querySelector("input[name=piece-id]").value),
      utilisateur: event.target.querySelector("input[name=utilisateur").value,
      commentaire: event.target.querySelector("input[name=commentaire]").value,
      nbEtoiles: parseInt(event.target.querySelector("input[name=nbEtoiles]").value)
    }

    const chargeUtile = JSON.stringify(avis);

    fetch("http://localhost:8081/avis", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: chargeUtile
    });

  });
}

export const afficherGraphiqueAvis = async () => {
      // Calcul du nombre total de commentaires par quantité d'étoiles attribuées
      const avis = await fetch("http://localhost:8081/avis").then(avis => avis.json());
      const nb_commentaires = [0, 0, 0, 0, 0];
      for (let commentaire of avis) {
        nb_commentaires[commentaire.nbEtoiles - 1]++;
      }

      const labels = ["5", "4", "3", "2", "1"];

      const data = {
        labels: labels,
        datasets: [{
        label: "Étoiles attribuées",
        data: nb_commentaires.reverse(),
          backgroundColor: "rgb(238, 0, 0)", // couleur jaune
        }],
    };

    // Objet de configuration final
    const config = {
      type: "bar",
      data: data,
      options: {
        indexAxis: "y",
      },
    };

    // Rendu du graphique dans l'élément canvas
    const graphiqueAvis = new Chart(
      document.querySelector("#graphique-avis"),
      config,
    );

    // Recuperation des pieces depuis le localStorage
    const piecesJSON = window.localStorage.getItem("pieces");

    const pieces = JSON.parse(piecesJSON);

    //Calcul du nombre de commentaire 

    let nbCommentairesDispo = 0;
    let nbCommentairesNonDispo = 0;

    for (let i = 0; i < avis.length; i++) {
      const piece = pieces.find(piece => piece.id === avis[i].pieceId);
      
      if (piece) {
        if(piece.disponibilite){
          nbCommentairesDispo++;
        }else{
          nbCommentairesNonDispo++;
        }
      }
    }

    const labelsDispo = ["Disponible", "Non disponible"];

    const dataDispo = {
      labels: labelsDispo,
      datasets: [{
        label: "Nombre de commentaires",
        data: [nbCommentairesDispo, nbCommentairesNonDispo],
        backgroundColor: "rgba(0, 230, 255, 1)",
      }],
    };

    const configDispo = {
      type: "bar",
      data: dataDispo,
    };

    new Chart(
      document.querySelector("#graphique-dispo"),
      configDispo,
    );
}
  
export const ajoutListenersAvis = () => {
    const piecesElements = document.querySelectorAll(".fiches article button");

    for (let i = 0; i < piecesElements.length; i++) {
      piecesElements[i].addEventListener("click", async (event) => {
        const id = event.target.dataset.id;
        const reponse = await fetch("http://localhost:8081/pieces/" + id + "/avis");
        const avis = await reponse.json();
        const pieceElement = event.target.parentElement;

        const avisElement = document.createElement("p");
        for (let i = 0; i < avis.length; i++) {
            avisElement.innerHTML += `<b>${avis[i].utilisateur}:</b> ${avis[i].commentaire} <br>`;
        }
        pieceElement.appendChild(avisElement);
      });
    }
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

"use strict";
/* global Chart */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.afficherGraphiqueAvis = exports.ajoutListenerEnvoyerAvis = exports.afficherAvis = exports.ajoutListenersAvis = void 0;
const ajoutListenersAvis = () => {
    const piecesElements = document.querySelectorAll(".fiches article button");
    for (let i = 0; i < piecesElements.length; i++) {
        piecesElements[i].addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
            const id = event.target.dataset.id;
            //tester si les avis sont déja present dans le localStorage
            let avis = window.localStorage.getItem(`avis-piece-${id}`);
            if (avis === null) {
                /* Code de récupération des pièces depuis l’API HTTP */
                avis = yield fetch("http://localhost:8081/pieces/" + id + "/avis").then(avis => avis.json());
                // Transformation des pièces en JSON
                const valeurAvis = JSON.stringify(avis);
                // Stockage des informations dans le localStorage
                window.localStorage.setItem(`avis-piece-${id}`, valeurAvis);
            }
            else {
                avis = JSON.parse(avis);
            }
            const pieceElement = event.target.parentElement;
            (0, exports.afficherAvis)(pieceElement, avis);
        }));
    }
};
exports.ajoutListenersAvis = ajoutListenersAvis;
const afficherAvis = (pieceElement, avis) => {
    const avisElement = document.createElement("p");
    for (let i = 0; i < avis.length; i++) {
        avisElement.innerHTML += `<b>${avis[i].utilisateur}:</b> ${avis[i].commentaire} <br>`;
    }
    pieceElement.appendChild(avisElement);
};
exports.afficherAvis = afficherAvis;
const ajoutListenerEnvoyerAvis = () => {
    const formulaireAvis = document.querySelector(".formulaire-avis");
    formulaireAvis.addEventListener("submit", (event) => {
        event.preventDefault();
        // Création de l’objet du nouvel avis.
        const avis = {
            pieceId: parseInt(event.target.querySelector("input[name=piece-id]").value),
            utilisateur: event.target.querySelector("input[name=utilisateur").value,
            commentaire: event.target.querySelector("input[name=commentaire]").value,
            nbEtoiles: parseInt(event.target.querySelector("input[name=nbEtoiles]").value)
        };
        const chargeUtile = JSON.stringify(avis);
        fetch("http://localhost:8081/avis", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        });
    });
};
exports.ajoutListenerEnvoyerAvis = ajoutListenerEnvoyerAvis;
const afficherGraphiqueAvis = () => __awaiter(void 0, void 0, void 0, function* () {
    // Calcul du nombre total de commentaires par quantité d'étoiles attribuées
    const avis = yield fetch("http://localhost:8081/avis").then(avis => avis.json());
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
                backgroundColor: "rgb(238, 0, 0)", // Couleur de fond
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
    new Chart(document.querySelector("#graphique-avis"), config);
    // Recuperation des pieces depuis le localStorage
    const piecesJSON = window.localStorage.getItem("pieces");
    const pieces = JSON.parse(piecesJSON);
    //Calcul du nombre de commentaire 
    let nbCommentairesDispo = 0;
    let nbCommentairesNonDispo = 0;
    for (let i = 0; i < avis.length; i++) {
        const piece = pieces.find(piece => piece.id === avis[i].pieceId);
        if (piece) {
            if (piece.disponibilite) {
                nbCommentairesDispo++;
            }
            else {
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
                backgroundColor: "rgb(238, 0, 0)",
            }],
    };
    const configDispo = {
        type: "bar",
        data: dataDispo,
    };
    new Chart(document.querySelector("#graphique-dispo"), configDispo);
});
exports.afficherGraphiqueAvis = afficherGraphiqueAvis;

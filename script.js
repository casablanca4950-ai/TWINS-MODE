// --- 1. Liste des produits ---
const produits = [
  { nom: "T-shirt Noir", prix: 120, img: "tshirt.jpg" },
  { nom: "Jeans Bleu", prix: 250, img: "jeans.jpg" },
  { nom: "Casquette Rouge", prix: 80, img: "casquette.jpg" }
];

// Afficher les produits dans la page
const container = document.getElementById("produits");

produits.forEach(p => {
  const div = document.createElement("div");
  div.className = "produit";
  div.innerHTML = `
    <img src="${p.img}" width="150">
    <h3>${p.nom}</h3>
    <p>Prix : ${p.prix} DH</p>
    <button onclick="ajouterPanier('${p.nom}', ${p.prix})">Ajouter au panier</button>
  `;
  container.appendChild(div);
});

// --- 2. Panier ---
let panier = [];

// Ajouter produit au panier
function ajouterPanier(nom, prix) {
  panier.push({ nom, prix });
  afficherPanier();
}

// Afficher le panier et total
function afficherPanier() {
  const panierDiv = document.getElementById("panier");
  let html = "<h3>Panier :</h3><ul>";
  let total = 0;
  panier.forEach(p => {
    html += `<li>${p.nom} - ${p.prix} DH</li>`;
    total += p.prix;
  });
  html += `</ul><p>Total : ${total} DH</p>`;
  panierDiv.innerHTML = html;
}

// --- 3. Firebase configuration ---
const firebaseConfig = {
  apiKey: "AIzaSyAYSaKTFeBZBIkDHsdFDX41VQLgMvquq0o",  // API_KEY
  authDomain: "twins-mode.firebaseapp.com",
  projectId: "twins-mode",  // PROJECT_ID
  storageBucket: "twins-mode.firebasestorage.app",
  messagingSenderId: "697349133391",
  appId: "1:697349133391:android:810e981e6d2c989cb4c63a"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// --- 4. Envoyer la commande sur Firebase ---
function envoyerCommande(nomClient, adresse) {
  if(panier.length === 0){
    alert("Votre panier est vide !");
    return;
  }

  db.collection("commandes").add({
    nomClient: nomClient,
    adresse: adresse,
    panier: panier,
    date: new Date()
  })
  .then(() => {
    alert("Commande envoyée !");
    panier = []; // vider le panier après envoi
    afficherPanier();
  })
  .catch(err => console.error(err));
}

let message = `Commande :
Produit : ${produit}
Nom : ${nom}
Adresse : ${adresse}
Téléphone : ${tel}`;

  window.open(
    "https://wa.me/212662401126?text=" + encodeURIComponent(message)
  );
}

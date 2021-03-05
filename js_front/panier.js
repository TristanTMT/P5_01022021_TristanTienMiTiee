/* VARIABLES */
const docHtml = document.getElementById("panier__item");
const totalPrice = document.getElementById("totalPrice");
const prixTotalPanier = document.getElementById("prixTotalPanier");

const orderTotalPrice = sessionStorage.getItem("orderTotalPrice");

let products = []; // tableau vide pour push les ID

let priceAll = 0;


displayQuantity();


// Contenu du panier, des boutons de suppression et d'annulation du panier ainsi que du formulaire de contact 
function displayQuantity() {

  if (localStorage.getItem('produits') !== null) {

      let items = JSON.parse(localStorage.getItem('produits'));
      total = 0; //initialisation du total à 0

      // index permet de prendre le bon item dans le tableau
      items.forEach((product, index) => {
              console.log(index);
                  
                  total = total + (product.price * product.quantity);
        
                  docHtml.innerHTML += `
                    <div class="containerCardPanier">
                        <figure class="cardPanier">
                            <a href="produit.html?id=${product._id}">
                            <img class="" src="${product.imageUrl}" alt="">
                            </a>
                            <figcaption class="cardPanier__body">
                                <h2>${product.name}</h2>
                                <p>${product._id}</p>
                                <p><strong>Couleur :</strong> ${product.color}</p>
                                <p><strong>Quantité :</strong> ${product.quantity}</p>
                                <button class="decrease__item ${index}">-</button>
                                <button class="increase__item ${index}">+</button>
                                <p id="totalPrice"><strong>Total :</strong> ${(product.price * product.quantity) / 100} €</p>
                                <button class="delete__item ${index}" id="deleteArticle"">Supprimer</button>
                            </figcaption>
                        </figure>
                    </div>
                    `;
            });

      //Total prix + boutton annuler commande    
      docHtml.insertAdjacentHTML("beforeend",
          `<div class="total">
              <p class="cart-section totalPrice"><b>Total: ${(total/100).toFixed(2).replace(".",",")}€</b></p>
              <button class="cancel__ordered button">
                  <p>Annuler le panier</p>
              </button>
          </div>`
      );
      

      // L'ecoute du boutton -
      const decreaseItem = document.querySelectorAll(".decrease__item ");
      decreaseItem.forEach((btn) => {

          btn.addEventListener('click', e => {
          removeOneItem(e, items);
          })
      })
      // L'ecoute des bouttons +
      const increaseItem = document.querySelectorAll(".increase__item");
      increaseItem.forEach((btn) => {

          btn.addEventListener('click', e => {
          addOneItem(e, items);
          })
      })
      // supprimer
      const deleteItem = document.querySelectorAll(".delete__item");
      deleteItem.forEach((btn) => {

          btn.addEventListener('click', e => {
          deleteItemSelect(e, items);
          });
      });
      // annuler
      const cancelOrdered = document.querySelector(".cancel__ordered");
      cancelOrdered.addEventListener('click', () => {
          cancelMyOrdered();
      });

  } else {
      docHtml.insertAdjacentHTML("afterbegin",
          `<h2>Panier</h2>
          <p class="cart-section">
              Vous n'avez aucun article!<a href="./index.html"><b>Revenir à la page d'accueil</b></a>
          </p>`
      )
  }
}

// Appel ma function du nombre d'article dans mon panier
itemConfirmation()

// Test si l'item s'ajoute au panier le panier.
function itemConfirmation() {
    
    div = document.querySelector(".item__number");
    
    if (localStorage.getItem('produits') !== null) {
      console.log("test ajout")
    }
};

// =====================================================================================

// Ajoute "1" d'un article
function addOneItem(e, items) {
  let index = e.target.classList[1].slice(-1);
  items[index].quantity++;
  localStorage.setItem('produits', JSON.stringify(items));
  updateNumberArticles();
}

// =====================================================================================

// Enlève "1" d'un article, en arrivant à zéro il est supprimé
function removeOneItem(e, items) {
  let index = e.target.classList[1].slice(-1);
  items[index].quantity--;
  
  if (items[index].quantity <= 0) {
      items.splice(index, 1);       
      if (items.length === 0 ) {
          localStorage.removeItem('produits');
      } else {
          localStorage.setItem('produits', JSON.stringify(items));
      }
  } else {
      localStorage.setItem('produits', JSON.stringify(items));
  }
  updateNumberArticles();
}

/* LES FONCTIONS */

//Supprime l'article sélectionné.
//Récupère l'index de l'article correspondant avec le caractère du nom de la classe. 
//Supprime le bon article dans le tableau "items" du localStorage
function deleteItemSelect(e, items) {
  let index = e.target.classList[1].slice(-1);
  items.splice(index, 1);
  localStorage.setItem('produits', JSON.stringify(items));

  if (items.length === 0) {
      localStorage.removeItem('produits');
  }
  updateNumberArticles();
}

// =====================================================================================

//Annulation tout le panier
function cancelMyOrdered() {
  localStorage.removeItem('produits');
  updateNumberArticles();
}

// =====================================================================================

//Réinitialise la section "item__select" et le nombre d'article dans le panier
function updateNumberArticles() {
  docHtml.innerHTML = "";
  displayQuantity();
  itemConfirmation();
}


/* CONTACT UTILISATEURS FORMULAIRE */
document.getElementById("confirmOrder").addEventListener("click", (event) => {
  const nomInvalid = document.getElementById("nomInvalid");
  const prenomInvalid = document.getElementById("prenomInvalid");
  const addressInvalid = document.getElementById("addressInvalid");
  const cityInvalid = document.getElementById("cityInvalid");
  const emailInvalid = document.getElementById("emailInvalid");

  const lastName = document.getElementById("lastname").value;
  const firstName = document.getElementById("firstname").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const email = document.getElementById("email").value;

  if (!lastName) {
    nomInvalid.textContent = "Votre nom n'est pas valide !";
    event.preventDefault();
  } else if (!firstName) {
    prenomInvalid.textContent = "Votre prénom n'est pas valide !";
    event.preventDefault();
  } else if (!address) {
    addressInvalid.textContent = "Votre adresse n'est pas valide !";
    event.preventDefault();
  } else if (!city) {
    cityInvalid.textContent = "Votre ville n'est pas valide !";
    event.preventDefault();
  } else if (!email) {
    emailInvalid.textContent = "Votre email n'est pas valide !";
    event.preventDefault();
  } else {
    postFormular();
  }
});

function getContact() {
    const lastName = document.getElementById("lastname").value;
    const firstName = document.getElementById("firstname").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const email = document.getElementById("email").value;
    
    let contact = {
        lastName: lastName,
        firstName: firstName,
        address: address,
        city: city,
        email: email,
      };
        // alert(JSON.stringify(contact));
        return contact;
};

function pushProductsId(product) {
  
  /* Push tous les ID du localStorage dans le tableau products */
  products.push(product._id);
  console.log(products);
};

/* FONCTION pour POST le formulaire */
function postFormular() {
    /* Objet pour la requete à envoyer au serveur */
    let objToSend = { contact: getContact() , products };
    objToSend = JSON.stringify(objToSend);
    // alert(objToSend);

    fetch("http://localhost:3000/api/teddies/order", {
    method: "POST", /* crée et envoie des données au serveur */
    headers: {
        "Content-Type": "application/json", /* indique au serveur quel type de données a réellement été envoyé */
    },
    mode: "cors",
    body: objToSend,
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        // alert(objToSend);
        sessionStorage.setItem("products", JSON.stringify(data.products));
        sessionStorage.setItem("contact", JSON.stringify(data.contact));
        sessionStorage.setItem("orderId", JSON.stringify(data.orderId));
        window.location.replace("./confirmationCommande.html");
    })
    .catch((e) => {
        displayError();
        console.log(e);
    });
};

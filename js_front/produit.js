const docHtml = document.getElementById("product");

/* MDN : Obtenir les paramètres de recherche à partir de l'URL de la fenêtre en cours */
/* Dans l'URL : ?id = ... */
function targetId(){
    let parsedUrl = new URL(window.location.href).searchParams.get("id"); 
    // console.log(parsedUrl)
    return parsedUrl;
}

const changeTotalPrice = (pricePerUnit) => {
    /* Prix total sur l'input */
    document.getElementById("quantity").addEventListener('change', (event) => {
        document.getElementById("totalPrice").innerHTML = `Prix total : ${(pricePerUnit * event.target.value)} €`;

        // console.log(`Prix total : ${(pricePerUnit * event.target.value)}`);
    });
};

fetch(`http://localhost:3000/api/teddies/${targetId()}`)
  .then((response) => {
    /* Vérification connection serveur */
    if (response.ok){
        return response.json();
    }
    else
      Promise.reject(response.status);
  })
  /* Si connection afficher produit */
  .then((data) => {
      console.log(data);
    /* Chaque couleur dans la data*/
    let colors;
    data.colors.forEach( color => {
        // console.log(color)
        colors += `<option value="${color}" selected>${color}</option>`;
    });
    /* HTML dynamique */
    docHtml.innerHTML += `
    <div class="product__image">
        <img src="${data.imageUrl}" alt="${data.name}">
    </div>
    <article class="product__infos">
        <h3 class="product__infos--title">${data.name}</h3>
        <div class="product__infos--description">${data.description}</div>
        <form class="product__infos--options optionsBox">
            <label for="option">Couleur :</label>
            <select name="option" id="colorOptions" class="section__choice">
                ${colors}
            </select>
        </form>
        <div class="optionsBox">
            <div class="product__infos--quantity">
                Quantité: <input id="quantity" type="number" min="0" value="1">
            </div>
        </div>
        <p>Prix unitaire : ${(data.price / 100)} €</p>
        <div class="product__infos--price" id="totalPrice">
            Prix total : ${(data.price / 100)} €
        </div>
        <div class="button--center">
            <button id="buttonAdd" class="button">Ajouter au panier</button>
            <div><a href="index.html">Retour liste</a></div>
        </div>
    </article>`;

    let pricePerUnit = (data.price / 100).toFixed(2);

    changeTotalPrice(pricePerUnit);

    /* Agir sur le buton Ajouter au panier */
    document.querySelector(".button").addEventListener("click", () => {
        let colorChoice = document.querySelector(".section__choice");
        // HTMLSelectElement.selectedIndex est un long qui représente l'index du premier élément sélectionné <option> : MDN
        data.selectColors = colorChoice.options[colorChoice.selectedIndex].value;
        alert(`${data.name} a été ajouté dans le panier`);
        addToLocalStorage(data);
        // window.location.reload();
    });

  })
  .catch(function(error) {
    console.log(error);
});

// Function ajout des articles au panier.
function addToLocalStorage (item) {
    const quantityProduct = document.getElementById("quantity");
    // tableaux pour stocker chaque ours
    let panier = []

    // stockage dans un objet
    let product = {
        _id: item._id,
        imageUrl: item.imageUrl,
        name: item.name,
        price: item.price,
        color: document.getElementById("colorOptions").value,
        // quantity: 1,
        quantity: quantityProduct.value,
        selectColors: item.selectColors
    }
    let otherItem = true;
    // Si localStorage est vide elle crée un nouveau tableau panier et l'enregistre dans le localStorage
    if (localStorage.getItem('produits') === null) {
        panier.push(product);
        localStorage.setItem('produits', JSON.stringify(panier));
    } 
    // Sinon elle récupère le tableau du localStorage, ajoute le nouveau produit, et enregistre le nouveau tableau.
    else { 
        panier = JSON.parse(localStorage.getItem('produits'));

        panier.forEach((prod) => {
            if (item._id === prod._id && item.selectColors === prod.selectColors) {
                prod.quantity++;
                otherItem = false;
            }
        })
    if (otherItem) panier.push(product);
    localStorage.setItem('produits', JSON.stringify(panier));
}

};
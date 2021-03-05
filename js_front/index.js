const docHtml = document.getElementById("cards");


const api = fetch("http://localhost:3000/api/teddies").then((response) => {
  /* Vérification connection serveur */
  if (response.ok){
      return response.json();
  }
  else
    Promise.reject(response.status);
});

api
  /* Si connection afficher chaque produit */
  .then((data) => {
    console.log(data);
    data.forEach((objet) => {
      let priceInEuro = objet.price / 100;
      docHtml.innerHTML += `
        <a href="produit.html?id=${objet._id}">
          <figure class="card">
            <img src="${objet.imageUrl}" alt="${objet.name}" class="card__image">
            <figcaption class="card__body">
              <h2>${objet.name}</h2>
              <p><strong>${priceInEuro.toFixed(2)} €</strong></p>
            </figcaption>
          </figure>
        </a>
      `;
    });
  })
  .catch(function(error) {
    console.log(error);
    console.log("Désolé l'API n'est pas connecté !")
});


// console.log(api);


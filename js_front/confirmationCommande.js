function confirmationCommande() {
    const contact = JSON.parse(sessionStorage.getItem('contact'));
    const orderId = JSON.parse(sessionStorage.getItem('orderId'));
    const orderTotalPrice = JSON.parse(sessionStorage.getItem('orderTotalPrice'));
    
    const confirmation = document.getElementById('confirmation');
    
    confirmation.innerHTML += `
        <h2 class="title">Orinoco vous remercie !</h2>
        <i class="fas fa-shipping-fast"></i>
        <p>Merci pour votre achat <span><strong>${contact.lastName} ${contact.firstName}</strong></span> ! Votre commande <span><strong>${orderId}</strong></span> d'un montant de <span id="total_amount"><strong>${orderTotalPrice}</strong></span> € a bien été enregistrée.</p>
        <p>Vous recevrez sous peu une confirmation sur votre mail : <strong>${contact.email}</strong></p>
        <p>La livraison se fera à votre adresse : <strong>${contact.address}</strong> à <strong>${contact.city}</strong></p>
    
        <h3>A bientôt sur Orinoco !</h3>
        <button class="button" onclick="retourAccueil()">Retourner à l'accueil</button>
    `
};

// REMETTRE A ZéRO LE LOCALSTORAGE QUAND ON REVIENT à L'ACCUEIL: index.html
function retourAccueil() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "index.html";
    // alert("LocalStorage et SessionStorage vide à présent ! ");
}

confirmationCommande();
//code pour les annimation des barre dans les compétences
// DomContentLoaded est un événement qui est déclenché lorsque le document HTML a été complètement chargé et analysé, sans attendre les feuilles de style, les images et les sous-documents chargés.
document.addEventListener('DOMContentLoaded', function() {
    // Stocke dans la variable bars toutes les barres de compétences
    const bars = document.querySelectorAll('.bar');

    function animateBars() {
        bars.forEach(bar => {
            // Récupère la valeur de l'attribut data-level de la barre
            const level = bar.getAttribute('data-level');
            // on récupère la position de départ de la barre dons le coins inférieur gauche 
            // getBoundingClientRect() retourne un objet avec les propriétés suivantes :    bottom, height, left, right, top, width, x, y
            // Ce qui correspond à la position de notre barre
            // top est la position du coin haut gauche de la barre défini par getBoundingClientRect()
            const barPosition = bar.getBoundingClientRect().top;

            // window correspond à la fenêtre dans son ensemble est innerHeight permet de récupérer sa hauteur 
            // et on divise apr 1.3 pour avoir la hauteur de la fenêtre j'usqu'à la section que l'on veut animer
            const screenPosition = window.innerHeight;

            // Quand on arrive à la hauteur de la barre, on lui affecte la valeur de data-level
            if (barPosition < screenPosition) {
                // On applique la valeur de data-level à la largeur de la barre (on va retrouver style="widht: "data-level"%" dans les balises li)
                bar.style.width = level + '%';
            }
        });
    }

    // On écoute l'événement scroll et on appelle la fonction animateBars quad l'utilasteur scroll
    window.addEventListener('scroll', animateBars);
    animateBars(); // Appel initial pour vérifier si les barres sont déjà visibles
});

//code pour l'API
document.addEventListener('DOMContentLoaded', function() {
    //On récupère l'élément qui correspond au bouton
    const fetchDogFactButton = document.getElementById('fetch-dog-fact');
    //On récupère l'élément qui correspond au paragraphe qui va afficher le texte
    const dogFactParagraph = document.getElementById('dog-fact');

    //On écoute l'événement click sur le bouton
    fetchDogFactButton.addEventListener('click', function() {
        //On va chercher ce qui nous interesse sur l'api
        fetch('https://dog-api.kinduff.com/api/facts')
            //On récupère la réponse de l'api et on la transforme en JSON
            .then(response => response.json())
            //On récupère les données
            .then(data => {
                //les données sont sous la forme d'une liste dans l'api on prend donc le premier élément
                const fact = data.facts[0];
                //On affiche ce qu'on a récupéré dans le paragraphe
                dogFactParagraph.textContent = fact;
            })
            //Si une erreur survient on affiche un message d'erreur
            .catch(error => {
                //On affiche l'erreur dans la console
                console.error('Erreur:', error);
                //On affiche un message d'erreur dans le paragraphe
                dogFactParagraph.textContent = 'Une erreur est survenue lors de la récupération du fait.';
            });
    });
});

//code pour le formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    // Récupérer les données du stockage local et pré-remplir les champs
    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');

    if (storedName) {
        nameInput.value = storedName;
    }

    if (storedEmail) {
        emailInput.value = storedEmail;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche le rechargement de la page 
                                //pour pas que l'utilisateur se retrouve en haut de la page après avoir envoyer son message

        // Récupérer les données du formulaire
        const name = nameInput.value;
        const email = emailInput.value;
        const message = document.getElementById('message').value;

        // Valider les données
        let valid = true;

        if (name === "") {
            document.getElementById('errorname').innerHTML = "Veuillez entrer un nom valide";
            valid = false;
        } else {
            document.getElementById('errorname').innerHTML = "";
        }

        if (email.indexOf("@") < 0 || email.indexOf(".") < 0) {
            document.getElementById('erroremail').innerHTML = "Veuillez entrer une adresse email valide";
            valid = false;
        } else {
            document.getElementById('erroremail').innerHTML = "";
        }

        if (message === "") {
            document.getElementById('errormsg').innerHTML = "Veuillez entrer un message valide";
            valid = false;
        } else {
            document.getElementById('errormsg').innerHTML = "";
        }

        if (valid) {
            // Enregistrer le nom et l'email dans le stockage local
            localStorage.setItem('name', name);
            localStorage.setItem('email', email);

            // Traiter les données pour les envoyer à un serveur
            console.log("Nom:", name);
            console.log("Email:", email);
            console.log("Message:", message);

            // Simulation de l'envoie des données vers un serveur distant avec l'api jsonplaceholder.typicode.com
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Succès:', data);
                alert('Votre message a été envoyé avec succès!');
                form.reset(); // Réinitialiser le formulaire
            })

            .catch(error => {
                console.error('Erreur:', error);
                alert('Une erreur est survenue lors de l\'envoi de votre message.');
            });
        }
    });
});
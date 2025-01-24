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

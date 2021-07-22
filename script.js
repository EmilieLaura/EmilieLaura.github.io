/* Constante pour la librairie Charming et explosion de lettres : chaque lettre dans un span*/
const item = document.querySelectorAll('.item');

/* Constantes pour le bouton de nav menu */
const btnNav = document.querySelector('#navIcon');
const containerMenu = document.querySelector('#containerMenu');

/* Constantes barres menu */
const b1 = document.querySelector('.b1');
const b2 = document.querySelector('.b2');
const b3 = document.querySelector('.b3');
const menuT = document.querySelector('#menuTexte');

/* Constantes animation menu aléatoire */
const menuItem = document.querySelectorAll('.menuItem');



let toggle = 0;


for(var j = 0; j < item.length; j++){
    charming(item[j]);
}

/* si toggle est à 0, fait le translate */
btnNav.addEventListener('click', () => {
    if(toggle === 0){
        toggle ++;

        /* animation barres menu */
        TweenMax.to(b2, 0.01, {display : 'none'})

        TweenMax.to(b1, 0.1, {top: 1, transform: 'rotate(225deg'})
        TweenMax.to(b3, 0.1, {top: -1, transform: 'rotate(-225deg'})
        // pour que les barres forment une croix

        TweenMax.to(containerMenu, 0.8, {left: 0, ease: Power2.easeOut})
        /* tu emmènes containerMenu à sa place initiale = de -100 à 0%, en 0.8seconde */
        /* .easeOut = plus lentement vers la fin / .easeIn = plus lentement au début */

        TweenMax.to(b1, 0.6, {background: "#efefe3"})
        TweenMax.to(b3, 0.6, {background: "#efefe3"})
        TweenMax.to(menuT, 0.6, {color: "#efefe3"})


    } else {
        toggle --;

        /* animation barres menu */
        TweenMax.to(b2, 0.01, {delay: 0.25, display : 'block'})
        // délai avant que la barre b2 réapparaisse au clic

        TweenMax.to(b1, 0.1, {delay: 0.4, top: -6, transform: 'rotate(0deg'})
        TweenMax.to(b3, 0.1, {delay: 0.4, top: 6, transform: 'rotate(0deg'})

        TweenMax.to(containerMenu, 0.8, {left: '-100%', ease: Power4.easeIn})
        /* Power4 = plus doux */

        TweenMax.to(b1, 0.3, {delay: 0.3, background: "#333a3d"})
        TweenMax.to(b3, 0.3, {delay: 0.3,background: "#333a3d"})
        TweenMax.to(menuT, 0.3, {delay: 0.3,color: "#333a3d"})

    }
})

/* TweenMax = une méthode GreenSock // .to = amener un élément quelque part */

/***** Animation menu aléatoire *****/
menuItem.forEach(item => item.addEventListener('mouseenter', (e) =>  {
    // menuItem = tous les éléments du menu
    // tous les items du menu : item
    // chaque item, nous sommes à l'écoute de l'événement mouseenter
    // (e) = l'événement lui-même, pour connaître quel élément du menu on est en train de survoler

    console.log(e.target);
    // e.target : console renvoie l'élément précis que l'on survole

    // accéder à tous les enfants de l'item :
    console.log(e.target.childNodes) ;
    // console renvoie une NodeList(5) = car compte les 3 éléments et les 2 espaces entre eux.
    // NodeList(5) [text, span.item, text, span.label, text]

    // accéder au premier enfant : span class="item"
    console.log(e.target.childNodes) ;


    let lettreFromItem = Array.from(e.target.childNodes[1].querySelectorAll('span'));

    console.log(lettreFromItem);
    /* console renvoie : (7) [span.char1, span.char2, span.char3, span.char4, span.char5, span.char6, span.char7 ]
    0: span.char1 / 1: span.char2 / 2: span.char3 / 3: span.char4 ... /
    */

    for(i=0 ; i < lettreFromItem.length ; i++) {

        TweenMax.to(lettreFromItem[i], 1, {
            x: Math.floor(Math.random() * 100 - 50),
            // trouver un nombre aléatoire entre -50 et 50

            y: Math.floor(Math.random() * 100 - 50),

            z: Math.floor(Math.random() * 100 - 50), // profondeur

            rotation: Math.floor(Math.random() * 100 - 50), // rotation

            opacity: 0.15, // opacité
            
            ease: Circ.easeOut // très rapide au début + ralenti progressif jusqu'à la fin
        })
    }

    // Math.floor : retirer les décimaux
    // Math.random : donne un chiffre entre 0 et 1
    // exemple : 0.2 * 100 - 50 = -30 > l'animation va aller à -30 sur x


    menuItem.forEach(item => item.addEventListener('mouseleave', () => {

        for(k = 0 ; k < lettreFromItem.length ; k++) {

            TweenMax.to(lettreFromItem[k], 1, {
                x: 0,
                // trouver un nombre aléatoire entre -50 et 50
    
                y: 0,
    
                z: 0, // retour profondeur
    
                rotation: 0, // retour rotation
    
                opacity: 1, // retour opacité
                
                ease: Circ.easeOut // très rapide au début + ralenti progressif jusqu'à la fin
            })
        }

    }))

}))

menuItem.forEach(item => item.addEventListener('click', () => {

    toggle --;
    TweenMax.to(b2, 0.01, {delay: 0.25, display : 'block'})
    TweenMax.to(b1, 0.1, {top: -10, transform: 'rotate(0deg'})
    TweenMax.to(b3, 0.1, {top: 10, transform: 'rotate(0deg'})
    TweenMax.to(containerMenu, 0.8, {left: '-100%', ease: Power4.easeIn})
}))



/***** Animation : apparition au scroll *****/
const ratio = 0.2;
const options = {
    root: null,
    rootMargin: '0px',
    threshold: ratio
};
const handleIntersect = function(entries, observer){
    entries.forEach(function(entry){
        if(entry.intersectionRatio > ratio){
            entry.target.classList.add('slideInUp');
            observer.unobserve(entry.target)
        }
    });
};
var observer = new IntersectionObserver(handleIntersect, options);
document.querySelectorAll('.text-anim').forEach((r) => {
    observer.observe(r);
});



/***** Animation du menu déroulant : section présentation (sur frontpage) *****/

let elements = document.querySelectorAll('.presentation_card');
let elementsVisible = document.querySelectorAll('.card_contenu');
let elementScroll = document.querySelector('.presentation_divScroll');


for(let i=0 ; i < elements.length ; i++) {
    elements[i].addEventListener('mouseover', () => {

        elementsVisible[i].classList.add('card_visible');
        elementScroll.style.height = (i + 1) * (100/(elements.length)) + '%';
    });

    elements[i].addEventListener('mouseout', () => {
        elementsVisible[i].classList.remove('card_visible');
    });
}



/***** Animation survol : section réalisations (sur frontpage) *****/

let realisations = document.querySelectorAll('.realisations_desktop');
let realisationSurvol = document.querySelectorAll('.realisations_survol');

for(let i=0 ; i < realisations.length ; i++) {
    realisations[i].addEventListener('mouseover', () => {

        realisationSurvol[i].style.display = 'initial';
    });

    realisations[i].addEventListener('mouseout', () => {
        realisationSurvol[i].style.display = 'none';
    });
}





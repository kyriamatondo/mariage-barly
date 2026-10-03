/* =====================================================
   INFORMATIONS DU MARIAGE
   ===================================================== */

const C = {

  name1: "Barly",
  name2: "Priscille",

  // Date du mariage
  date: "05 décembre 2026",

  // Date utilisée pour le compte à rebours
  weddingDate: "2026-12-05T00:00:00",

  // Lieu
  venue: "SALLE EXAUDUS GRAND ARENA",

  // Adresse
  address:
    "Avenue Bonga n°24, croisement avenue du Stade, q/Matonge, c/Kalamu\n" +
    "Réf : derrière Winner / Rond-point Victoire",

  // Dress code
  dress: "Chic et élégant",

  // Texte des boutons
  button: "Choisir ma boisson",
  navButton: "Choisir ma boisson",

  // Lien du formulaire Tally
  tally: "https://tally.so/r/VOTRE_LIEN",

  // Galerie
  galleryTitle: "Notre histoire en images",

  photos: [
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg",
    "images/photo5.jpg",
    "images/photo6.jpg"
  ]

};


/* =====================================================
   OUTILS
   ===================================================== */

const $ = id => document.getElementById(id);

const reduce =
  matchMedia('(prefers-reduced-motion: reduce)').matches;


/* =====================================================
   TEXTES
   ===================================================== */

document.title =
  `${C.name1} & ${C.name2} | Invitation`;

$('n1').textContent = C.name1;
$('f1').textContent = C.name1;

$('n2').textContent = C.name2;
$('f2').textContent = C.name2;

$('date').textContent = C.date;
$('fdate').textContent = C.date;

$('venue').textContent = C.venue;

$('addr').textContent = C.address;

$('dress').textContent = C.dress;
$('dtitle').textContent = C.dress;

$('gtitle').textContent =
  C.galleryTitle;


/* =====================================================
   BOUTONS
   ===================================================== */

// Bouton rouge en haut à droite
$('cta0').href = C.tally;
$('cta0').textContent = C.navButton;


// Bouton sous le compte à rebours
$('cta').href = C.tally;
$('cta').textContent = C.button;


// Bouton en bas de la page
$('cta2').href = C.tally;
$('cta2').textContent = C.button;


/* =====================================================
   NAVBAR
   ===================================================== */

addEventListener(
  'scroll',
  () => {
    $('nav').classList.toggle(
      'solid',
      scrollY > 50
    );
  },
  { passive: true }
);


/* =====================================================
   CŒURS QUI FLOTTENT
   ===================================================== */

if (!reduce) {

  const box = $('loveDust');

  const colors = [
    '#e5252a',
    '#e5252a',
    '#e98a90',
    '#dfb775'
  ];

  for (let i = 0; i < 18; i++) {

    const p = document.createElement('span');

    p.className = 'love-particle';

    p.textContent = '\u2665\uFE0E';

    p.style.left =
      (Math.random() * 100) + 'vw';

    p.style.fontSize =
      (0.8 + Math.random() * 1.1)
        .toFixed(2) + 'rem';

    p.style.color =
      colors[
        Math.floor(
          Math.random() * colors.length
        )
      ];

    p.style.setProperty(
      '--d',
      (11 + Math.random() * 10)
        .toFixed(1) + 's'
    );

    p.style.setProperty(
      '--w',
      (-Math.random() * 18)
        .toFixed(1) + 's'
    );

    box.appendChild(p);
  }
}


/* =====================================================
   COMPTE À REBOURS
   ===================================================== */

const target =
  new Date(C.weddingDate).getTime();

const pad = value =>
  String(value).padStart(2, '0');

let cdTimer;


function updateCountdown() {

  const diff =
    target - Date.now();


  // Date invalide
  if (isNaN(target)) {

    $('cd').hidden = true;

    clearInterval(cdTimer);

    return;
  }


  // Le mariage est arrivé
  if (diff <= 0) {

    $('cd').outerHTML =
      '<p class="cd-end up">C’est le grand jour !</p>';

    clearInterval(cdTimer);

    return;
  }


  // Jours
  $('days').textContent =
    pad(
      Math.floor(diff / 864e5)
    );


  // Heures
  $('hours').textContent =
    pad(
      Math.floor(diff / 36e5) % 24
    );


  // Minutes
  $('minutes').textContent =
    pad(
      Math.floor(diff / 6e4) % 60
    );


  // Secondes
  $('seconds').textContent =
    pad(
      Math.floor(diff / 1e3) % 60
    );
}


updateCountdown();

cdTimer =
  setInterval(
    updateCountdown,
    1000
  );


/* =====================================================
   CARROUSEL
   ===================================================== */

const frame = $('frame');
const dots = $('dots');
const n = C.photos.length;


const slides =
  C.photos.map((src, i) => {

    const s =
      document.createElement('div');

    s.className = 'slide';


    const img =
      new Image();

    img.src = src;

    img.alt =
      `${C.name1} et ${C.name2}, photo ${i + 1}`;

    img.draggable = false;


    if (i > 0) {
      img.loading = 'lazy';
    }


    img.onerror = () => {

      console.warn(
        'Photo introuvable : ' + src
      );

      img.remove();

    };


    s.appendChild(img);

    frame.appendChild(s);


    const d =
      document.createElement('button');

    d.setAttribute(
      'aria-label',
      `Photo ${i + 1}`
    );


    d.onclick = () => {

      go(i);

      restart();

    };


    dots.appendChild(d);


    return s;

  });


const dotEls =
  [...dots.children];

let cur = 0;
let timer;


/* =====================================================
   AFFICHAGE CARROUSEL
   ===================================================== */

function paint(i) {

  dotEls.forEach(
    (d, k) => {

      d.classList.toggle(
        'on',
        k === i
      );

    }
  );


  $('count').textContent =
    `${pad(i + 1)} / ${pad(n)}`;

}


/* =====================================================
   CHANGER DE PHOTO
   ===================================================== */

function go(i) {

  i =
    (i + n) % n;


  slides[cur]
    .classList
    .remove('on');


  slides[i]
    .classList
    .add('on');


  cur = i;


  paint(i);

}


/* =====================================================
   REDÉMARRER LE CARROUSEL
   ===================================================== */

function restart() {

  clearInterval(timer);


  if (n > 1 && !reduce) {

    timer =
      setInterval(
        () => go(cur + 1),
        6500
      );

  }

}


/* =====================================================
   BOUTONS PRÉCÉDENT / SUIVANT
   ===================================================== */

$('next').onclick = () => {

  go(cur + 1);

  restart();

};


$('prev').onclick = () => {

  go(cur - 1);

  restart();

};


/* =====================================================
   BALAYAGE AU DOIGT / SOURIS
   ===================================================== */

let x0 = null;


frame.addEventListener(
  'pointerdown',
  e => {

    x0 = e.clientX;

  }
);


addEventListener(
  'pointerup',
  e => {

    if (x0 === null) {
      return;
    }


    const dx =
      e.clientX - x0;


    x0 = null;


    if (Math.abs(dx) > 40) {

      go(
        cur +
        (dx < 0 ? 1 : -1)
      );

      restart();

    }

  }
);


/* =====================================================
   PAUSE AU SURVOL
   ===================================================== */

frame.addEventListener(
  'mouseenter',
  () => {
    clearInterval(timer);
  }
);


frame.addEventListener(
  'mouseleave',
  restart
);


/* =====================================================
   INITIALISATION
   ===================================================== */

slides[0]
  .classList
  .add('on');

paint(0);

restart();
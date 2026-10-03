/* ===== À MODIFIER ICI UNIQUEMENT ===== */
const C = {
  name1: "Barly",
  name2: "Priscille",
  date: "05.12.2026",
  venue: "EXODUS GRAND ARENA",
  dress: "Chic et élégant",
  dressNote: "Le noir et le rouge sont à l'honneur. Sortez vos plus belles tenues.",
  button: "Choisir ma boisson",
  tally: "https://tally.so/r/VOTRE_LIEN",
  galleryTitle: "Notre histoire en images",
  photos: [ // minimum 5 photos des mariés, dans le dossier images/
    "images/photo1.jpg", "images/photo2.jpg", "images/photo3.jpg",
    "images/photo4.jpg", "images/photo5.jpg", "images/photo6.jpg"
  ]
};
/* ===================================== */

const $ = id => document.getElementById(id);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Textes */
document.title = `${C.name1} & ${C.name2} | Invitation`;
$('n1').textContent = $('f1').textContent = C.name1;
$('n2').textContent = $('f2').textContent = C.name2;
$('date').textContent = $('fdate').textContent = C.date;
$('venue').textContent = C.venue;
$('dress').textContent = C.dress;
$('dtitle').textContent = C.dress;
$('dnote').textContent = C.dressNote;
$('gtitle').textContent = C.galleryTitle;
['cta0', 'cta', 'cta2'].forEach(id => { $(id).textContent = C.button; $(id).href = C.tally; });

/* Navbar : fond noir dès qu'on descend */
addEventListener('scroll', () => $('nav').classList.toggle('solid', scrollY > 40), { passive: true });

/* Entrée du hero */
if (!reduce) {
  gsap.from('#n1,#n2,.amp', { y: 50, opacity: 0, duration: 1.4, ease: 'power3.out', stagger: .25 });
  gsap.from('.orn,.invite,.hero .cta,.info', { opacity: 0, duration: 1.2, delay: 1, stagger: .2 });
}

/* Carrousel */
const frame = $('frame'), dots = $('dots'), n = C.photos.length;
const slides = C.photos.map((src, i) => {
  const s = document.createElement('div'); s.className = 'slide';
  const img = new Image(); img.src = src; img.alt = `${C.name1} et ${C.name2}, photo ${i + 1}`; img.draggable = false;
  img.onerror = () => img.remove();
  if (i > 0) img.loading = 'lazy';
  s.appendChild(img); frame.appendChild(s);
  const d = document.createElement('button'); d.setAttribute('aria-label', `Photo ${i + 1}`);
  d.onclick = () => { go(i); restart(); }; dots.appendChild(d);
  return s;
});
const dotEls = [...dots.children];
let cur = 0, timer;

function paint(i) { dotEls.forEach((d, k) => d.classList.toggle('on', k === i)); $('count').textContent = `${i + 1} / ${n}`; }
function go(i) {
  i = (i + n) % n;
  const a = slides[cur], b = slides[i];
  if (reduce) { gsap.set(slides, { opacity: 0 }); gsap.set(b, { opacity: 1 }); }
  else if (a !== b) {
    gsap.killTweensOf([a, b]);
    gsap.to(a, { opacity: 0, duration: 1.2, ease: 'power2.inOut' });
    gsap.fromTo(b, { opacity: 0, filter: 'grayscale(100%)', scale: 1.1 }, { opacity: 1, duration: 1.2, ease: 'power2.inOut' });
    gsap.to(b, { filter: 'grayscale(0%)', duration: 3, delay: .6, ease: 'sine.inOut' });
    gsap.to(b, { scale: 1, duration: 9, ease: 'none' });
  }
  cur = i; paint(i);
}
function restart() { clearInterval(timer); if (n > 1 && !reduce) timer = setInterval(() => go(cur + 1), 6500); }

$('next').onclick = () => { go(cur + 1); restart(); };
$('prev').onclick = () => { go(cur - 1); restart(); };

/* Balayage au doigt ou à la souris */
let x0 = null;
frame.addEventListener('pointerdown', e => { x0 = e.clientX; });
addEventListener('pointerup', e => {
  if (x0 === null) return; const dx = e.clientX - x0; x0 = null;
  if (Math.abs(dx) > 40) { go(cur + (dx < 0 ? 1 : -1)); restart(); }
});
frame.addEventListener('mouseenter', () => clearInterval(timer));
frame.addEventListener('mouseleave', restart);

gsap.set(slides[0], { opacity: 1 });
paint(0); restart();

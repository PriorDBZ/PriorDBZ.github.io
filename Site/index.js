const STORAGE_KEY = 'pcConfig';
let COMPONENT_DATA = {};

// Charger la config depuis localStorage
const raw = localStorage.getItem(STORAGE_KEY);
if (raw) {
  try {
    COMPONENT_DATA = JSON.parse(raw);
  } catch (e) {
    console.error('Config invalide dans localStorage', e);
  }
} else {
  console.warn('Aucune configuration trouvée. Va sur preconfig.html pour en créer une.');
}

// Remplit les cartes
document.querySelectorAll('.card').forEach(card => {
  const key = card.dataset.component;
  const comp = COMPONENT_DATA[key];
  if (!comp) return;

  const img   = card.querySelector('.card-img');
  const model = card.querySelector('.card-model');
  const price = card.querySelector('.card-price');

  img.src = comp.image;
  img.alt = comp.name || '';
  model.textContent = comp.name || '';
  price.textContent = comp.price ? comp.price + ' €' : '';

  card.addEventListener('click', () => openModal(card, comp));
});

// Modal
const modal      = document.getElementById('modal');
const modalClose = document.getElementById('modal-close');
const modalCat   = document.getElementById('modal-cat');
const modalImg   = document.getElementById('modal-img');
const modalModel = document.getElementById('modal-model');
const modalPrice = document.getElementById('modal-price');
const modalDesc  = document.getElementById('modal-desc');
const modalLink  = document.getElementById('modal-link');

function openModal(card, comp) {
  modalCat.textContent   = card.querySelector('.card-cat').textContent;
  modalImg.src           = comp.image;
  modalImg.alt           = comp.name || '';
  modalModel.textContent = comp.name || '';
  modalPrice.textContent = comp.price ? comp.price + ' €' : '';
  modalDesc.textContent  = comp.desc || '';
  modalLink.href         = comp.link || '#';
  modal.style.display    = 'flex';
}

modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
// Bouton pour calculer le prix total
const calcBtn = document.getElementById('calc-total');
const totalDisplay = document.getElementById('total-display');

if (calcBtn && totalDisplay) {
  calcBtn.addEventListener('click', () => {
    let total = 0;

    // Parcourt toutes les clés de COMPONENT_DATA
    for (const key in COMPONENT_DATA) {
      const comp = COMPONENT_DATA[key];
      if (!comp || !comp.price) continue;

      // extrait la partie numérique du prix ("257€" -> 257) [web:237][web:249]
      const num = parseFloat(
        String(comp.price)
          .replace('€', '')
          .replace(',', '.')
          .trim()
      );

      if (!isNaN(num)) {
        total += num;
      }
    }

    totalDisplay.textContent = total.toFixed(2) + ' €';
  });
}

// Calcul automatique du prix total de la config
(function calcTotal() {
  const totalDisplay = document.getElementById('total-display');
  if (!totalDisplay || !COMPONENT_DATA) return;

  let total = 0;

  for (const key in COMPONENT_DATA) {
    const comp = COMPONENT_DATA[key];
    if (!comp || !comp.price) continue;

    const num = parseFloat(
      String(comp.price)
        .replace('€', '')
        .replace(',', '.')
        .trim()
    ); // [web:237][web:249]

    if (!isNaN(num)) total += num;
  }

  if (total > 0) {
    totalDisplay.textContent = total.toFixed(2) + ' €';
  } else {
    totalDisplay.textContent = '—';
  }
})();
const backBtn = document.getElementById('back-config');
if (backBtn) {
  backBtn.addEventListener('click', () => {
    window.location.href = 'Site/préconfig.html';
  });
}

const STORAGE_KEY = 'pcConfig';
const PROFILES_KEY = 'pcProfiles';

// Fonctions pour gérer les profils
function getProfiles() {
  const raw = localStorage.getItem(PROFILES_KEY);
  return raw ? JSON.parse(raw) : {};
}

function saveProfiles(profiles) {
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
}

// Bouton: ouvrir le menu de sauvegarde
document.getElementById('save-profile-btn').addEventListener('click', () => {
  document.getElementById('save-modal').style.display = 'flex';
});

// Bouton: confirmer la sauvegarde
document.getElementById('confirm-save').addEventListener('click', () => {
  const profileName = document.getElementById('save-profile-name').value.trim();
  if (!profileName) {
    alert('Veuillez entrer un nom de profil.');
    return;
  }
  const data = buildDataFromForm();
  const profiles = getProfiles();
  profiles[profileName] = data;
  saveProfiles(profiles);
  document.getElementById('save-modal').style.display = 'none'; // Masquer après sauvegarde
  document.getElementById('save-profile-name').value = ''; // Vider le champ
});

// Bouton: annuler la sauvegarde
document.getElementById('cancel-save').addEventListener('click', () => {
  document.getElementById('save-modal').style.display = 'none';
  document.getElementById('save-profile-name').value = '';
});

// Fermer la modal en cliquant en dehors
document.getElementById('save-modal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('save-modal')) {
    document.getElementById('save-modal').style.display = 'none';
    document.getElementById('save-profile-name').value = '';
  }
});

// Bouton: ouvrir le menu des profils
document.getElementById('load-profile').addEventListener('click', () => {
  populateLoadSelect();
  document.getElementById('load-modal').style.display = 'flex';
});

// Bouton: confirmer le chargement
document.getElementById('confirm-load').addEventListener('click', () => {
  const select = document.getElementById('load-profile-select');
  const profileName = select.value;
  if (!profileName) {
    return;
  }
  const profiles = getProfiles();
  const data = profiles[profileName];
  if (!data) return;
  fillFormFromData(data);
  localStorage.setItem('lastLoadedProfile', profileName); // Sauvegarder le dernier chargé
  document.getElementById('load-modal').style.display = 'none';
  document.getElementById('output').value = JSON.stringify(data, null, 2);
});

// Bouton: annuler le chargement
document.getElementById('cancel-load').addEventListener('click', () => {
  document.getElementById('load-modal').style.display = 'none';
});

// Bouton: supprimer le profil
document.getElementById('delete-profile').addEventListener('click', () => {
  const select = document.getElementById('load-profile-select');
  const profileName = select.value;
  if (!profileName) {
    return;
  }
  select.disabled = true;
  document.getElementById('load-buttons').style.display = 'none';
  document.getElementById('delete-confirm').style.display = 'block';
});

// Bouton: confirmer la suppression
document.getElementById('confirm-delete').addEventListener('click', () => {
  const select = document.getElementById('load-profile-select');
  const profileName = select.value;
  const profiles = getProfiles();
  delete profiles[profileName];
  saveProfiles(profiles);
  populateLoadSelect(); // Actualiser la liste
  select.value = '';
  select.disabled = false;
  document.getElementById('load-buttons').style.display = 'block';
  document.getElementById('delete-confirm').style.display = 'none';
});

// Bouton: annuler la suppression
document.getElementById('cancel-delete').addEventListener('click', () => {
  document.getElementById('load-profile-select').disabled = false;
  document.getElementById('load-buttons').style.display = 'block';
  document.getElementById('delete-confirm').style.display = 'none';
});

// Fermer la modal en cliquant en dehors
document.getElementById('load-modal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('load-modal')) {
    document.getElementById('load-modal').style.display = 'none';
  }
});

// Fonction pour peupler le select des profils
function populateProfileSelect() {
  const select = document.getElementById('profile-select');
  if (select) {
    select.innerHTML = '<option value="">Choisir un profil existant</option>';
    const profiles = getProfiles();
    for (const name in profiles) {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      select.appendChild(option);
    }
  }
}

// Fonction pour peupler le select de chargement
function populateLoadSelect() {
  const select = document.getElementById('load-profile-select');
  select.innerHTML = '<option value="">Sélectionner un profil</option>';
  const profiles = getProfiles();
  for (const name in profiles) {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
  }
}

// ---- Fonctions utilitaires ----

function buildDataFromForm() {
  return {
    cpu: {
      name:  document.getElementById('cpu-name').value,
      price: document.getElementById('cpu-price').value,
      image: document.getElementById('cpu-image').value,
      link:  document.getElementById('cpu-link').value,
      desc:  document.getElementById('cpu-desc').value,
    },
    gpu: {
      name:  document.getElementById('gpu-name').value,
      price: document.getElementById('gpu-price').value,
      image: document.getElementById('gpu-image').value,
      link:  document.getElementById('gpu-link').value,
      desc:  document.getElementById('gpu-desc').value,
    },
    ram: {
      name:  document.getElementById('ram-name').value,
      price: document.getElementById('ram-price').value,
      image: document.getElementById('ram-image').value,
      link:  document.getElementById('ram-link').value,
      desc:  document.getElementById('ram-desc').value,
    },
    motherboard: {
      name:  document.getElementById('mb-name').value,
      price: document.getElementById('mb-price').value,
      image: document.getElementById('mb-image').value,
      link:  document.getElementById('mb-link').value,
      desc:  document.getElementById('mb-desc').value,
    },
    storage: {
      name:  document.getElementById('stor-name').value,
      price: document.getElementById('stor-price').value,
      image: document.getElementById('stor-image').value,
      link:  document.getElementById('stor-link').value,
      desc:  document.getElementById('stor-desc').value,
    },
    psu: {
      name:  document.getElementById('psu-name').value,
      price: document.getElementById('psu-price').value,
      image: document.getElementById('psu-image').value,
      link:  document.getElementById('psu-link').value,
      desc:  document.getElementById('psu-desc').value,
    },
    pcCase: {
      name:  document.getElementById('case-name').value,
      price: document.getElementById('case-price').value,
      image: document.getElementById('case-image').value,
      link:  document.getElementById('case-link').value,
      desc:  document.getElementById('case-desc').value,
    },
    cooler: {
      name:  document.getElementById('cooler-name').value,
      price: document.getElementById('cooler-price').value,
      image: document.getElementById('cooler-image').value,
      link:  document.getElementById('cooler-link').value,
      desc:  document.getElementById('cooler-desc').value,
    }
  };
}

function fillFormFromData(data) {
  if (!data) return;
  const safe = (key) => (data[key] || {});

  const cpu = safe('cpu');
  document.getElementById('cpu-name').value  = cpu.name  || '';
  document.getElementById('cpu-price').value = cpu.price || '';
  document.getElementById('cpu-image').value = cpu.image || '';
  document.getElementById('cpu-link').value  = cpu.link  || '';
  document.getElementById('cpu-desc').value  = cpu.desc  || '';

  const gpu = safe('gpu');
  document.getElementById('gpu-name').value  = gpu.name  || '';
  document.getElementById('gpu-price').value = gpu.price || '';
  document.getElementById('gpu-image').value = gpu.image || '';
  document.getElementById('gpu-link').value  = gpu.link  || '';
  document.getElementById('gpu-desc').value  = gpu.desc  || '';

  const ram = safe('ram');
  document.getElementById('ram-name').value  = ram.name  || '';
  document.getElementById('ram-price').value = ram.price || '';
  document.getElementById('ram-image').value = ram.image || '';
  document.getElementById('ram-link').value  = ram.link  || '';
  document.getElementById('ram-desc').value  = ram.desc  || '';

  const mb = safe('motherboard');
  document.getElementById('mb-name').value  = mb.name  || '';
  document.getElementById('mb-price').value = mb.price || '';
  document.getElementById('mb-image').value = mb.image || '';
  document.getElementById('mb-link').value  = mb.link  || '';
  document.getElementById('mb-desc').value  = mb.desc  || '';

  const stor = safe('storage');
  document.getElementById('stor-name').value  = stor.name  || '';
  document.getElementById('stor-price').value = stor.price || '';
  document.getElementById('stor-image').value = stor.image || '';
  document.getElementById('stor-link').value  = stor.link  || '';
  document.getElementById('stor-desc').value  = stor.desc  || '';

  const psu = safe('psu');
  document.getElementById('psu-name').value  = psu.name  || '';
  document.getElementById('psu-price').value = psu.price || '';
  document.getElementById('psu-image').value = psu.image || '';
  document.getElementById('psu-link').value  = psu.link  || '';
  document.getElementById('psu-desc').value  = psu.desc  || '';

  const pcCase = safe('pcCase');
  document.getElementById('case-name').value  = pcCase.name  || '';
  document.getElementById('case-price').value = pcCase.price || '';
  document.getElementById('case-image').value = pcCase.image || '';
  document.getElementById('case-link').value  = pcCase.link  || '';
  document.getElementById('case-desc').value  = pcCase.desc  || '';

  const cooler = safe('cooler');
  document.getElementById('cooler-name').value  = cooler.name  || '';
  document.getElementById('cooler-price').value = cooler.price || '';
  document.getElementById('cooler-image').value = cooler.image || '';
  document.getElementById('cooler-link').value  = cooler.link  || '';
  document.getElementById('cooler-desc').value  = cooler.desc  || '';
}
document.getElementById('go-index').addEventListener('click', () => {
  window.location.href = '../index.html'; // même dossier que preconfig.html [web:168][web:169]
});
// Télécharger la config courante en fichier JSON
document.getElementById('download-json').addEventListener('click', () => {
  const data = buildDataFromForm();
  const json = JSON.stringify(data, null, 2);

  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'pc-config.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});
// Bouton visible qui ouvre la boîte de dialogue de fichier
document.getElementById('upload-json-btn').addEventListener('click', () => {
  document.getElementById('upload-json').click();
});

// Importer une config depuis un fichier JSON
document.getElementById('upload-json').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const text = e.target.result;
      const data = JSON.parse(text);

      // Remplir le formulaire
      fillFormFromData(data);

      // Sauvegarder dans localStorage pour index.html
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      // Optionnel : montrer aussi le JSON dans le textarea
      const output = document.getElementById('output');
      if (output) output.value = JSON.stringify(data, null, 2);

    } catch (err) {
      console.error(err);
    }
  };
  

  reader.readAsText(file);
});
// Définition des champs pour chaque composant
const componentFields = {
  cpu:     ['cpu-name', 'cpu-price', 'cpu-image', 'cpu-link', 'cpu-desc'],
  gpu:     ['gpu-name', 'gpu-price', 'gpu-image', 'gpu-link', 'gpu-desc'],
  ram:     ['ram-name', 'ram-price', 'ram-image', 'ram-link', 'ram-desc'],
  motherboard: ['mb-name', 'mb-price', 'mb-image', 'mb-link', 'mb-desc'],
  storage: ['stor-name', 'stor-price', 'stor-image', 'stor-link', 'stor-desc'],
  psu:     ['psu-name', 'psu-price', 'psu-image', 'psu-link', 'psu-desc'],
  pcCase:  ['case-name', 'case-price', 'case-image', 'case-link', 'case-desc'],
  cooler:  ['cooler-name', 'cooler-price', 'cooler-image', 'cooler-link', 'cooler-desc']
};

// Boutons pour vider les champs de chaque composant
document.querySelectorAll('.clear-component').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.component;
    const fields = componentFields[key];
    if (!fields) return;

    // Vider tous les champs de ce composant d'un coup
    fields.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
  });
});

// Aller à la page d'index EN SAUVEGARDANT d'abord
document.getElementById('go-index').addEventListener('click', () => {
  const data = buildDataFromForm();
  const profiles = getProfiles();
  profiles['default'] = data; // Sauvegarder comme profil default
  saveProfiles(profiles);
  // Ne pas changer lastLoaded, garder le dernier sélectionné par l'utilisateur
  window.location.href = '../index.html';
});
// Au chargement de preconfig.html : recharger la config sauvegardée
window.addEventListener('DOMContentLoaded', () => {
  populateLoadSelect();
  // Charger le dernier profil chargé ou 'default'
  const lastProfile = localStorage.getItem('lastLoadedProfile') || 'default';
  const profiles = getProfiles();
  if (profiles[lastProfile]) {
    fillFormFromData(profiles[lastProfile]);
    document.getElementById('output').value = JSON.stringify(profiles[lastProfile], null, 2);
  }

  // Gestion du bouton flottant
  const updateFloatingBtn = () => {
    const normalBtn = document.getElementById('go-index');
    const rect = normalBtn.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    const fixedBtn = document.getElementById('go-index-fixed');
    fixedBtn.style.opacity = isVisible ? '0' : '1';
    fixedBtn.style.pointerEvents = isVisible ? 'none' : 'auto';
  };

  window.addEventListener('scroll', updateFloatingBtn);
  updateFloatingBtn(); // Initial check
});

// Bouton flottant
function goToIndex() {
  const data = buildDataFromForm();
  const profiles = getProfiles();
  profiles['default'] = data;
  saveProfiles(profiles);
  // Ne pas changer lastLoaded
  window.location.href = '../index.html';
}

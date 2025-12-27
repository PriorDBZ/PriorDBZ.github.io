const STORAGE_KEY = 'pcConfig';

// Bouton: sauvegarder la config dans localStorage
document.getElementById('save').addEventListener('click', () => {
  const data = buildDataFromForm();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  alert('Configuration sauvegardée dans le navigateur.');
});

// Bouton: charger la config depuis localStorage
document.getElementById('load').addEventListener('click', () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    alert('Aucune configuration sauvegardée.');
    return;
  }
  const data = JSON.parse(raw);
  fillFormFromData(data);
  document.getElementById('output').value = JSON.stringify(data, null, 2);
});

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

      alert('Configuration importée et sauvegardée.');
    } catch (err) {
      console.error(err);
      alert('Fichier JSON invalide.');
    }
  };

  reader.readAsText(file);
});
// Aller à la page d'index EN SAUVEGARDANT d'abord
document.getElementById('go-index').addEventListener('click', () => {
  const data = buildDataFromForm();                 // récupère la config actuelle
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); // sauvegarde [file:272][web:129][web:140]
  window.location.href = '../index.html';             // puis redirige
});
// Au chargement de preconfig.html : recharger la config sauvegardée
window.addEventListener('DOMContentLoaded', () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const data = JSON.parse(raw);          // parse le JSON stocké [web:129][web:249]
    fillFormFromData(data);                // remet les valeurs dans les champs [file:272]
    const output = document.getElementById('output');
    if (output) output.value = JSON.stringify(data, null, 2);
  } catch (e) {
    console.error('Config invalide dans localStorage', e);
  }
});

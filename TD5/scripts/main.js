import config from './config.js';
import { sortByName, createOption, getElement } from './utils.js';

let departments = [];
let communes = [];

const displayPopulation = (communeId) => {
  const commune = getElement(communes, communeId);
  document.getElementById('population').innerHTML = String(commune.population);
};

const displayCommunes = () => {
  const communeSelect = document.getElementById('commune-select');
  if (!communeSelect) return;
  communeSelect.innerHTML = '';
  for (const commune of communes) {
    communeSelect.append(createOption(commune.code, `${commune.nom}`));
  }
};

const fetchCommunes = (departmentCode) => {
  fetch(`${config.gouv.baseUrl}/departements/${departmentCode}/communes`)
    .then((res) => res.json())
    .then((json) => {
      communes = json.sort(sortByName);
      displayCommunes();
      displayPopulation(communes[0].code);
      localStorage.setItem('communeName', communes[0].nom);
    });
};

const displayDepartments = () => {
  const departmentSelect = document.getElementById('department-select');
  for (const department of departments) {
    departmentSelect.append(
      createOption(department.code, `${department.code} - ${department.nom}`)
    );
  }
  fetchCommunes(departmentSelect.value);
};

const fetchDepartments = () => {
  fetch(`${config.gouv.baseUrl}/departements`)
    .then((res) => res.json())
    .then((json) => {
      departments = json.sort(sortByName);
      displayDepartments();
      localStorage.setItem('departmentName', departments[0].nom);
    });
};

const initListeners = () => {
  const departmentSelect = document.getElementById('department-select');
  departmentSelect.addEventListener('change', () => {
    const department = getElement(departments, departmentSelect.value);
    localStorage.setItem('departmentName', department.nom);
    //sessionStorage.setItem('department', JSON.stringify(department));
    fetchCommunes(departmentSelect.value);
  });

  const communeSelect = document.getElementById('commune-select');
  communeSelect.addEventListener('change', () => {
    const commune = getElement(communes, communeSelect.value);
    localStorage.setItem('communeName', commune.nom);
    //sessionStorage.setItem('commune', JSON.stringify(commune));
    displayPopulation(communeSelect.value);
  });
};

const handleLoad = () => {
  initListeners();
  fetchDepartments();
};

window.addEventListener('load', handleLoad);

import config from './config.js';
import { sortByName, createOption, getElement } from './utils.js';

let departments = [];
let communes = [];

const selectedDepartment = () =>
  getElement(departments, document.getElementById('department-select').value);

const selectedCommune = () =>
  getElement(communes, document.getElementById('commune-select').value);

const displayPopulation = () => {
  const commune = selectedCommune();
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
  return new Promise((resolve, reject) => {
    fetch(`${config.gouv.baseUrl}/departements/${departmentCode}/communes`)
      .then((res) => {
        if (!res.ok) reject(res);
        else return res.json();
      })
      .then((json) => resolve(json.sort(sortByName)))
      .catch(reject);
  });
};

const displayDepartments = () => {
  const departmentSelect = document.getElementById('department-select');
  for (const department of departments) {
    departmentSelect.append(
      createOption(department.code, `${department.code} - ${department.nom}`)
    );
  }
};

const fetchDepartments = () => {
  return new Promise((resolve, reject) => {
    fetch(`${config.gouv.baseUrl}/departements`)
      .then((res) => {
        if (!res.ok) reject(res);
        else return res.json();
      })
      .then((json) => resolve(json.sort(sortByName)))
      .catch(reject);
  });
};

const handleDepartmentChange = () => {
  const department = selectedDepartment();
  localStorage.setItem('departmentName', department.nom);
  //localStorage.setItem('department', JSON.stringify(department));
  fetchCommunes(department.code)
    .then((pCommunes) => {
      communes = pCommunes;
      displayCommunes();
      handleCommuneChange(communes[0].code);
    })
    .catch(console.error);
};

const handleCommuneChange = () => {
  const commune = selectedCommune();
  localStorage.setItem('communeName', commune.nom);
  //localStorage.setItem('commune', JSON.stringify(commune));
  displayPopulation();
};

const initListeners = () => {
  const departmentSelect = document.getElementById('department-select');
  departmentSelect.addEventListener('change', () =>
    handleDepartmentChange(departmentSelect.value)
  );

  const communeSelect = document.getElementById('commune-select');
  communeSelect.addEventListener('change', () =>
    handleCommuneChange(communeSelect.value)
  );
};

const handleLoad = async () => {
  initListeners();
  try {
    departments = await fetchDepartments();
    displayDepartments();
    handleDepartmentChange(departments[0].code);
  } catch (err) {
    console.error(err);
  }
};

window.addEventListener('load', handleLoad);

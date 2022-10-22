import {
  previousPage,
  nextPage,
  fetchStations,
  displayStations,
  updatePaginationLimit,
} from './control.js';
import { displayError } from './utils.js';

let departmentName = undefined;
let communeName = undefined;

const isShowingCommune = () => document.getElementById('show-commune').checked;

const updateTitle = () => {
  document.getElementById('name').innerHTML = `${departmentName} ${
    isShowingCommune() ? ' - ' + communeName : ''
  }`;
};

const initListeners = () => {
  const previousButton = document.getElementById('previous');
  previousButton.addEventListener('click', () =>
    previousPage(departmentName, communeName)
  );

  const nextButton = document.getElementById('next');
  nextButton.addEventListener('click', () =>
    nextPage(departmentName, communeName)
  );

  const pageSizeSelect = document.getElementById('page-size');
  pageSizeSelect.addEventListener('change', () => {
    updatePaginationLimit(Number(pageSizeSelect.value));
    fetchStations(departmentName, communeName)
      .then(displayStations)
      .catch(displayError);
  });

  const showCommuneCheckbox = document.getElementById('show-commune');
  showCommuneCheckbox.addEventListener('change', () => {
    fetchStations(departmentName, communeName, true)
      .then(displayStations)
      .catch(displayError);
    updateTitle();
  });

  document
    .getElementById('back-button')
    .addEventListener('click', () => window.location.replace('./'));
};

const handleLoad = async () => {
  // const departmentString = localStorage.getItem('department');
  // if (!departmentString) window.location.replace('./');
  // const department = JSON.parse(departmentString);
  // departmentName = department.nom

  departmentName = localStorage.getItem('departmentName');
  communeName = localStorage.getItem('communeName');
  if (!departmentName || !communeName) window.location.replace('./');

  updateTitle();
  fetchStations(departmentName, communeName)
    .then(displayStations)
    .catch(displayError);
  initListeners();
};

window.addEventListener('load', handleLoad);

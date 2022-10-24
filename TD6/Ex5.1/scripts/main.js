import config from './config.js';
import { sortByName, createOption, getElement, displayError } from './utils.js';

let departments = [];
let communes = [];

const selectedDepartment = () =>
  getElement(departments, $('#department-select').val());

const selectedCommune = () => getElement(communes, $('#commune-select').val());

const displayPopulation = () =>
  $('#population').html(selectedCommune().population);

const displayCommunes = () => {
  for (const commune of communes) {
    $('#commune-select').append(createOption(commune.code, `${commune.nom}`));
  }
};

const fetchCommunes = (departmentCode, callback) => {
  $.getJSON(
    `${config.gouv.baseUrl}/departements/${departmentCode}/communes`,
    function (json) {
      callback(json.sort(sortByName));
    }
  ).fail(error);
};

const displayDepartments = () => {
  for (const department of departments) {
    $('#department-select').append(
      createOption(department.code, `${department.code} - ${department.nom}`)
    );
  }
};

const fetchDepartments = (callback, error) => {
  $.getJSON(`${config.gouv.baseUrl}/departements`, function (json) {
    callback(json.sort(sortByName));
  }).fail(error);
};

const handleDepartmentChange = () => {
  const department = selectedDepartment();
  localStorage.setItem('departmentName', department.nom);
  fetchCommunes(
    department.code,
    (pCommunes) => {
      communes = pCommunes;
      displayCommunes();
      handleCommuneChange(communes[0].code);
    },
    displayError
  );
};

const handleCommuneChange = () => {
  const commune = selectedCommune();
  localStorage.setItem('communeName', commune.nom);
  displayPopulation();
};

const initListeners = () => {
  $('#department-select').change(function () {
    handleDepartmentChange($(this).value);
  });

  $('#commune-select').change(function () {
    handleCommuneChange($(this).value);
  });
};

const handleLoad = () => {
  initListeners();
  fetchDepartments((pDepartements) => {
    departments = pDepartements;
    displayDepartments();
    handleDepartmentChange(departments[0].code);
  }, displayError);
};

$(document).ready(handleLoad);

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

const isShowingCommune = () => $('#show-commune').checked;

const updateTitle = () => {
  $('#name').html(
    `${departmentName} ${isShowingCommune() ? ' - ' + communeName : ''}`
  );
};

const loadStations = (reset = false) => {
  fetchStations(
    departmentName,
    communeName,
    reset,
    displayStations,
    displayError
  );
};

const initListeners = () => {
  $('#back-button').click(function () {
    window.location.replace('./');
  });

  $('#previous').click(function () {
    previousPage(departmentName, communeName);
  });

  $('#next').click(function () {
    nextPage(departmentName, communeName);
  });

  $('#page-size').change(function () {
    updatePaginationLimit(Number($(this).val()));
    loadStations();
  });

  $('#show-commune').change(function () {
    updateTitle();
    loadStations(true);
  });
};

const handleLoad = async () => {
  departmentName = localStorage.getItem('departmentName');
  communeName = localStorage.getItem('communeName');
  if (!departmentName || !communeName) window.location.replace('./');

  updateTitle();
  loadStations();
  initListeners();
};

$(document).ready(handleLoad);

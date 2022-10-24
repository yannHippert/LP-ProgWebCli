import config from './config.js';
import { createTd, displayError } from './utils.js';

const defaultPagination = {
  limit: 10,
  offset: 0,
  total: -1,
};

let pagination = {
  limit: 10,
  offset: 0,
  total: -1,
};

const isShowingCommune = () => $('#show-commune').checked;

const createTh = (text) => {
  const th = document.createElement('th');
  th.innerText = text;
  return th;
};

const getHeader = () => {
  const tr = document.createElement('tr');
  tr.append(createTh('Name'));
  tr.append(createTh('Address'));
  tr.append(createTh('Price (€)'));
  return tr;
};

const updatePagination = () => {
  $('#previous').prop('disabled', pagination.offset === 0);
  $('#next').prop(
    'disabled',
    pagination.offset + pagination.limit > pagination.total
  );
  const totalPages = Math.ceil(pagination.total / pagination.limit);
  const currentPage = Math.ceil(
    totalPages - (pagination.total - pagination.offset) / pagination.limit
  );
  $('#page-index').html(`${currentPage}/${totalPages}`);
};

const displayStations = (stations) => {
  $('#data-table').html(getHeader());
  stations.forEach((station) => {
    const tr = document.createElement('tr');
    tr.append(createTd(station.fields.cct_code_commune));
    tr.append(createTd(station.fields.cct_adresse));
    tr.append(createTd(station.fields.prix_visite));
    $('#data-table').append(tr);
  });
  updatePagination();
};

const fetchStations = (
  departmentName,
  communeName,
  resetPagination,
  callback,
  error
) => {
  if (resetPagination) pagination = { ...defaultPagination };
  const params = new URLSearchParams({
    dataset: 'controle_techn',
    rows: pagination.limit,
    start: pagination.offset,
  });
  if (isShowingCommune()) params.append('refine.cct_code_commune', communeName);
  else params.append('refine.cct_code_dept', departmentName);
  let url = `${config.control.apiUrl}?${params}`;
  $.getJSON(url, function (json) {
    pagination.total = json.nhits;
    callback(json.records);
  }).fail(error);
};

const previousPage = (departmentName, communeName) => {
  pagination.offset = Math.max(0, pagination.offset - pagination.limit);
  fetchStations(
    departmentName,
    communeName,
    false,
    displayStations,
    displayError
  );
};

const nextPage = (departmentName, communeName) => {
  if (pagination.total === -1) {
    fetchStations(
      departmentName,
      communeName,
      false,
      displayStations,
      displayError
    );
  } else if (pagination.offset + pagination.limit < pagination.total) {
    pagination.offset = pagination.offset + pagination.limit;
    fetchStations(
      departmentName,
      communeName,
      false,
      displayStations,
      displayError
    );
  }
};

const updatePaginationLimit = (newLimit) => {
  pagination.limit = newLimit;
  pagination.offset = 0;
};

export {
  updatePaginationLimit,
  previousPage,
  nextPage,
  fetchStations,
  displayStations,
  isShowingCommune,
};

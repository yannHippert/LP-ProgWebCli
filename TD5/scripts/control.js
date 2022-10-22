import config from './config.js';
import { createTd } from './utils.js';

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

const isShowingCommune = () => document.getElementById('show-commune').checked;

const updatePagination = () => {
  document.getElementById('previous').disabled = pagination.offset === 0;
  document.getElementById('next').disabled =
    pagination.offset + pagination.limit > pagination.total;
  const pageIndex = document.getElementById('page-index');
  const totalPages = Math.ceil(pagination.total / pagination.limit);
  const currentPage = Math.ceil(
    totalPages - (pagination.total - pagination.offset) / pagination.limit
  );
  pageIndex.innerText = `${currentPage}/${totalPages}`;
};

const displayStations = (stations) => {
  const table = document.getElementById('data-table');
  table.innerHTML = '';
  const tableHeader = document.getElementById('table-header-template');
  table.append(tableHeader.content.cloneNode(true).querySelector('tr'));
  stations.forEach((station) => {
    const tr = document.createElement('tr');
    tr.append(createTd(station.fields.cct_code_commune));
    tr.append(createTd(station.fields.cct_adresse));
    tr.append(createTd(station.fields.prix_visite));
    table.append(tr);
  });
  updatePagination();
};

const fetchStations = (departmentName, communeName, resetPagination) => {
  if (resetPagination) pagination = { ...defaultPagination };
  const params = new URLSearchParams({
    dataset: 'controle_techn',
    rows: pagination.limit,
    start: pagination.offset,
  });
  if (isShowingCommune()) params.append('refine.cct_code_commune', communeName);
  else params.append('refine.cct_code_dept', departmentName);
  let url = `${config.control.apiUrl}?${params}`;
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => {
        if (!res.ok) reject(res);
        else return res.json();
      })
      .then((json) => {
        pagination.total = json.nhits;
        resolve(json.records);
      })
      .catch(reject);
  });
};

const previousPage = (departmentName, communeName) => {
  pagination.offset = Math.max(0, pagination.offset - pagination.limit);
  fetchStations(departmentName, communeName)
    .then(displayStations)
    .catch(console.error);
};

const nextPage = (departmentName, communeName) => {
  if (pagination.total === -1) {
    fetchStations(departmentName, communeName)
      .then(displayStations)
      .catch(console.error);
  } else if (pagination.offset + pagination.limit < pagination.total) {
    pagination.offset = pagination.offset + pagination.limit;
    fetchStations(departmentName, communeName)
      .then(displayStations)
      .catch(console.error);
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

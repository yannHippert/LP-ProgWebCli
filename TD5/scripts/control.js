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

let departmentName = undefined;
let communeName = undefined;
let showCommune = false;

const createTd = (text) => {
  const td = document.createElement('td');
  td.innerText = text;
  return td;
};

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
  const tableHeader = document.getElementById('table-header-template');
  table.innerHTML = '';
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

const fetchStations = () => {
  if (!departmentName || !communeName) return;
  const params = new URLSearchParams({
    rows: pagination.limit,
    start: pagination.offset,
  });
  if (showCommune) params.append('refine.cct_code_commune', communeName);
  else params.append('refine.cct_code_dept', departmentName);
  let url =
    'https://data.economie.gouv.fr/api/records/1.0/search/?dataset=controle_techn&' +
    params;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      pagination.total = json.nhits;
      displayStations(json.records);
    })
    .catch(console.error);
};

const fetchPrevious = () => {
  if (pagination.offset - pagination.limit <= 0) {
    pagination.offset = 0;
  } else {
    pagination.offset -= pagination.limit;
  }
  fetchStations();
};

const fetchNext = () => {
  if (pagination.total === -1) {
    fetchStations();
  } else if (pagination.offset + pagination.limit < pagination.total) {
    pagination.offset = pagination.offset + pagination.limit;
    fetchStations();
  }
};

const updateTitle = () => {
  document.getElementById('name').innerHTML = `${departmentName} ${
    showCommune ? ' - ' + communeName : ''
  }`;
};

const initListeners = () => {
  const previousButton = document.getElementById('previous');
  previousButton.addEventListener('click', fetchPrevious);
  const nextButton = document.getElementById('next');
  nextButton.addEventListener('click', fetchNext);

  const pageSizeSelect = document.getElementById('page-size');
  pageSizeSelect.addEventListener('change', () => {
    pagination.limit = Number(pageSizeSelect.value);
    pagination.offset = 0;
    fetchStations();
  });

  const showCommuneCheckbox = document.getElementById('show-commune');
  showCommuneCheckbox.addEventListener('change', () => {
    showCommune = showCommuneCheckbox.checked;
    pagination = { ...defaultPagination };
    fetchStations();
    updateTitle();
  });
};

const handleLoad = async () => {
  /*onst departmentString = sessionStorage.getItem('department');
  if (!departmentString) return;
  const department = JSON.parse(departmentString);
  departmentName = department.nom;*/
  departmentName = localStorage.getItem('departmentName');
  communeName = localStorage.getItem('communeName');
  if (departmentName && communeName) {
    updateTitle();
    fetchStations();
    initListeners();
    return;
  }

  window.location.replace('./');
};

window.addEventListener('load', handleLoad);

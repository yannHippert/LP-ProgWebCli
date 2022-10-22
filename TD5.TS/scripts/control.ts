const pagination = {
  limit: 10,
  offset: 0,
  total: -1,
};

const fetchStations = () => {
  let url =
    'https://data.economie.gouv.fr/api/records/1.0/search/?dataset=controle_techn&q=&rows=%limit%&start=%offset%&facet=cct_code_dept&facet=code_postal&facet=cct_code_commune&facet=cct_denomination&facet=cat_vehicule_libelle&facet=cat_energie_libelle&facet=prix_visite&facet=prix_contre_visite_min&facet=prix_contre_visite_max';
  url = url.replace('%limit%', String(pagination.limit));
  url = url.replace('%offset%', String(pagination.offset));
  fetch(url)
    .then((res: any) => res.json())
    .then((json) => {
      pagination.total = json.nhits;
      pagination.offset = json.parameters.start;
      console.log(json);
    });
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
    pagination.offset += pagination.limit;
    fetchStations();
  }
};

import { ICommune, IDepartment } from '../interfaces/interfaces';
import config from './config';

let communes = [] as Array<ICommune>;

const getCommune = (code: string): ICommune | undefined => {
  const found = communes.find((elem: ICommune) => elem.code === code);
  return found;
};

const displayCommunes = () => {
  const communeSelect = document.getElementById('commune-select');
  if (!communeSelect) return;
  communeSelect.innerHTML = '';
  for (const commune of communes) {
    const option = document.createElement('option');
    option.innerHTML = `${commune.nom}`;
    option.value = commune.code;
    communeSelect.append(option);
  }
};

const fetchCommunes = (departmentCode: string) => {
  fetch(`${config.gouv.baseUrl}/departements/${departmentCode}/communes`)
    .then((res: any) => res.json())
    .then((json: Array<ICommune>) => {
      communes = { ...json };
      displayCommunes();
    });
};

const displayDepartments = (departments: Array<IDepartment>) => {
  const departmentSelect = document.getElementById(
    'department-select'
  ) as HTMLSelectElement;
  if (!departmentSelect) return;
  for (const department of departments) {
    const option = document.createElement('option');
    option.innerHTML = `${department.code} - ${department.nom}`;
    option.value = department.code;
    departmentSelect?.append(option);
  }
  fetchCommunes(departmentSelect.value);
};

const fetchDepartments = () => {
  fetch(`${config.gouv.baseUrl}/departements`)
    .then((res: any) => res.json())
    .then((json: Array<IDepartment>) => {
      displayDepartments(json);
    });
};

const initListeners = () => {
  const departmentSelect = document.getElementById(
    'department-select'
  ) as HTMLSelectElement;
  departmentSelect?.addEventListener('change', () => {
    fetchCommunes(departmentSelect.value);
  });

  const communeSelect = document.getElementById(
    'commune-select'
  ) as HTMLSelectElement;
  communeSelect?.addEventListener('change', () => {
    const commune = getCommune(communeSelect.value);
    const population = document.getElementById('population');
    if (!population || !commune) return;
    population.innerHTML = String(commune.population);
  });

  const weatherButton = document.getElementById(
    'weather-redirect'
  ) as HTMLButtonElement;
  weatherButton.addEventListener('click', () => {
    const commune = getCommune(communeSelect.value);
    if (!commune) return;
    sessionStorage.setItem('commune', JSON.stringify(commune));
    window.location.replace('./weather.html');
  });
};

const handleLoad = () => {
  initListeners();
  fetchDepartments();
};

window.addEventListener('load', handleLoad);

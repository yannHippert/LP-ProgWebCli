const displayError = (error) => {
  const errorField = document.getElementById('error');
  errorField.innerHTML = `${error.status} - ${error.statusText}`;
  errorField.classList.toggle('visible');
};

const sortByName = (a, b) => a.nom.localeCompare(b.nom);

const createTd = (text) => {
  const td = document.createElement('td');
  td.innerText = text;
  return td;
};

const createOption = (value, text) => {
  const option = document.createElement('option');
  option.value = value;
  option.innerHTML = text;
  return option;
};

const getElement = (list, code) => list.find((elem) => elem.code === code);

export { sortByName, createOption, createTd, getElement, displayError };

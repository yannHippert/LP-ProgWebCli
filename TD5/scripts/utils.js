const sortByName = (a, b) => a.nom.localeCompare(b.nom);

const createOption = (value, text) => {
  const option = document.createElement('option');
  option.value = value;
  option.innerHTML = text;
  return option;
};

const getElement = (list, code) => list.find((elem) => elem.code === code);

export { sortByName, createOption, getElement };

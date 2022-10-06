import {
  sum,
  countEvenInts,
  getBiggestEven,
  binarySearch,
} from './array_utils.js';

let inputCounter = 1;

const addInput = () => {
  const inputsContainer = document.querySelector('#inputs');
  const template = document
    .getElementById('value-input')
    .content.cloneNode(true);
  const label = template.querySelector('label');
  label.innerText = label.innerText.replace('%s', inputCounter);
  inputCounter++;
  inputsContainer.append(template);
};

const evaluate = () => {
  const inputContainer = document.getElementById('inputs');
  const inputs = inputContainer.querySelectorAll('input');
  const values = [];
  for (let input of inputs) {
    if (input.value !== '') values.push(Number(input.value));
  }

  document.getElementById('sum').innerHTML = sum(values);
  document.getElementById('evens').innerHTML = countEvenInts(values);
  const biggestEven = getBiggestEven(...values);
  document.getElementById('max-even').innerHTML =
    biggestEven === undefined ? 'pas de pairs dans la table' : biggestEven;
  const searchValue = Number(document.getElementById('search-input').value);
  const pos = binarySearch(searchValue, values);
  document.getElementById('search-res').innerHTML =
    values[pos] === searchValue ? pos : -1;
};

const ex1 = () => {
  const array = [1, 5, 18, 29];
  console.log('On a le tableau suivant:', array);
  console.log('La somme de ses valeurs est:', sum(array));
  console.log(`Le tableau contient ${countEvenInts(array)} entier(s) pair(s)`);
  console.log('Et le plus grand entier pair est:', getBiggestEven(...array));
};

const initAddButton = () => {
  const button = document.querySelector('#add-value');
  button.addEventListener('click', (e) => {
    e.preventDefault();
    addInput();
  });
};

const initEvalButton = () => {
  const button = document.querySelector('#evaluate-button');
  button.addEventListener('click', (e) => {
    e.preventDefault();
    evaluate();
  });
};

const onLoad = () => {
  ex1();

  initAddButton();
  initEvalButton();
  addInput();
};

window.addEventListener('load', () => onLoad());

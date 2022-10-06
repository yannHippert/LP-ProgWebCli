'use strict';
import { translator } from '../translations/translator.js';

/*========================
Ecrire une fonction qui additionne les entiers stockés dans un tableau.
*/

const sum = (array) => {
  let sum = 0;
  for (const item of array) {
    sum += item;
  }
  return sum;
};

const ex4_1 = () => {
  const list = [3, 6, 9, 11, 12, 13];
  console.log(translator.instance.translate('sumOf', list, sum(list)));
};

/*========================
Ecrire une fonction qui compte le nombre d'entiers pair dans un tableau.
*/

const countEvenInts = (array) => {
  let counter = 0;
  for (let item of array) {
    Number.isInteger(item) && item % 2 === 0 ? counter++ : 0;
  }
  return counter;
};

const ex4_2 = () => {
  const list = [3, 6, 9, 11, 12, 13];
  console.log(
    translator.instance.translate(
      'containsEvenNumbers',
      list,
      countEvenInts(list)
    )
  );
};

/*========================
Ecrire une fonction qui fusionne deux tableaux triés, et renvoie un tableau trié (sans utiliser sort).
*/

const fuseArrays = (a1, a2) => {
  const res = [];
  while (a1.length > 0 && a2.length > 0) {
    res.push(a1[0] < a2[0] ? a1.shift() : a2.shift());
  }
  return res.concat(a1).concat(a2);
};

const ex4_3 = () => {
  const array1 = [1, 5, 7, 10];
  const array2 = [3, 6, 9, 11, 12, 13];
  console.log('array1 =', array1);
  console.log('array2 =', array2);
  console.log(
    translator.instance.translate('mergedArray'),
    fuseArrays(array1, array2)
  );
};

/*========================
Ecrire une fonction qui réalise la recherche dichotomique dans un tableau (sans utiliser de fonctions propres au tableau).
*/

const isElementInList = (elem, list) => {
  return list[binarySearch(elem, list)] === elem;
};

function binarySearch(elem, list) {
  let left = 0;
  let right = list.length - 1;
  let middle;
  while (left <= right) {
    middle = Math.floor((left + right) / 2);
    if (list[middle] === elem) return middle;
    else if (list[middle] < elem) left = middle + 1;
    else right = middle - 1;
  }
  return Math.max(left, right);
}

const ex4_4 = () => {
  const list = [1, 2, 3, 4, 5, 7, 8, 9];
  //console.log('On a la liste suivante:', list);
  console.log(translator.instance.translate('listDefinition'), list);
  const a = 4;
  console.log(
    translator.instance.translate(
      isElementInList(a, list) ? 'elementInList' : 'elementNotInList',
      'a',
      a
    )
  );
  const b = 10;
  console.log(
    translator.instance.translate(
      isElementInList(b, list) ? 'elementInList' : 'elementNotInList',
      'b',
      b
    )
  );
};

/*========================
Ecrire une fonction qui prend en paramètres un certain nombre d'entiers (Rest parameters, cours n°1 page 26) et renvoie le plus grand pair.
*/

const getBiggest = (...list) => {
  if (list.length < 1) return undefined;

  let max = list[0];
  for (let item of list) {
    max = item > max ? item : max;
  }
  return max;
};

const ex4_5 = () => {
  console.log(
    translator.instance.translate(
      'biggestNumber',
      '1, 5, 7, 2, 4, 10, 3, 6, 4, 1',
      getBiggest(1, 5, 7, 2, 4, 10, 3, 6, 4, 1)
    )
  );
};

/*========================
En utilisant un "tableau associatif", écrire une fonction qui renvoie le nombre d'occurences de chaque mot d'une phrase.
*/

const getWordCounts = (text) => {
  if (!text) return undefined;

  const words = text.toLowerCase().split(' ');
  const wordCounts = {};
  for (const word of words) {
    wordCounts[word] = wordCounts[word] ? wordCounts[word] + 1 : 1;
  }
  return wordCounts;
};

const ex4_6 = () => {
  const sentence = prompt(
    translator.instance.translate('prompt_enterSentence')
  );
  console.log(translator.instance.translate('wordsInSentence', sentence));
  console.log(getWordCounts(sentence));
};

export { ex4_1, ex4_2, ex4_3, ex4_4, ex4_5, ex4_6 };

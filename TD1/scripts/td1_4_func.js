'use strict';
import { translator } from '../translations/translator.js';

/*========================
Ecrire une fonction qui additionne les entiers stockés dans un tableau.
*/

const sum = (array) => {
  return array.reduce((sum, item) => sum + item, 0);
};

const ex4_1 = () => {
  const list = [3, 6, 9, 11, 12, 13];
  console.log(translator.instance.translate('sumOf', list, sum(list)));
};

/*========================
Ecrire une fonction qui compte le nombre d'entiers pair dans un tableau.
*/

const countEvenInts = (array) => {
  return array.filter((item) => Number.isInteger(item) && item % 2 === 0)
    .length;
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
  const res = [...a1];
  a2.forEach((val) =>
    res.splice(recursiveBinarySearch(val, res, 0, res.length - 1), 0, val)
  );
  return res;
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

const isElementInList = (elem, list, left, right) => {
  return list[recursiveBinarySearch(elem, list, left, right)] === elem;
};

const recursiveBinarySearch = (elem, list, left, right) => {
  if (left === undefined || right === undefined) return undefined;
  if (left > right) return Math.max(left, right);
  const middle = Math.floor((left + right) / 2);
  if (list[middle] === elem) return middle;
  if (list[middle] < elem)
    return recursiveBinarySearch(elem, list, middle + 1, right);
  return recursiveBinarySearch(elem, list, left, middle - 1);
};

const ex4_4 = () => {
  const list = [1, 2, 3, 4, 5, 7, 8, 9];
  console.log(translator.instance.translate('listDefinition'), list);

  const a = 4;
  console.log(
    translator.instance.translate(
      isElementInList(a, list, 0, list.length - 1)
        ? 'elementInList'
        : 'elementNotInList',
      'a',
      a
    )
  );

  const b = 10;
  console.log(
    translator.instance.translate(
      isElementInList(b, list, 0, list.length - 1)
        ? 'elementInList'
        : 'elementNotInList',
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
  // return list.reduce(
  //   (max, number) => (number > max ? number : max),
  //   numbers[0]
  // );

  //  numbers.sort((a, b) => a - b);
  //  return numbers[numbers.length - 1];

  return Math.max(...list);
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
  if (!text) return;
  const words = text.toLowerCase().split(' ');
  const wordCounts = {};
  words.forEach((word) => {
    wordCounts[word] = wordCounts[word] ? wordCounts[word] + 1 : 1;
  });
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

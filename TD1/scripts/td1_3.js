'use strict';
import { translator } from '../translations/translator.js';

/*========================
Ecrire une fonction qui saisit une chaîne à l'aide de prompt
et boucle tant que cette chaîne n'est pas en majuscules (utilisation de toUpperCase() sur la chaîne).
*/

const ex3_1 = () => {
  let propmtValue;
  do {
    propmtValue = prompt(translator.instance.translate('prompt_capsWord'));
  } while (propmtValue === null || propmtValue !== propmtValue.toUpperCase());
};

/*========================
Ecrire une fonction qui génère une chaîne de 5 caractères dont chaque caractère est généré aléatoirement. 
On boucle tant que la chaîne n'est pas en majuscules. 
A chaque itération, afficher la chaîne générée. En fin de boucle, afficher le nombre d'itérations nécessaires pour obtenir une chaîne correcte.
Utiliser 65 + Math.random()*(123-65) permet d'obtenir un caractère aléatoire entre 'A' et 'z'.
Corriger pour que votre chaîne ne contienne que des caractères alphabétiques.
*/

const getRandomLetter = () => {
  if (Math.random() < 0.5) {
    return String.fromCharCode(65 + Math.random() * (91 - 65));
  } else {
    return String.fromCharCode(97 + Math.random() * (123 - 97));
  }
};

const testRandomLetter = () => {
  const data = {};
  for (let i = 0; i < 1000; i++) {
    const a = getRandomLetter();
    data[a] = data[a] ? data[a] + 1 : 1;
  }
  const ordered = Object.keys(data)
    .sort()
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});
  console.log(ordered);
};

const getRandomWord = (length = 1) => {
  let res = '';
  for (let i = 0; i < length; i++) {
    res += getRandomLetter();
  }
  return res;
};

const ex3_2 = () => {
  let counter = 0;
  let value;
  do {
    counter++;
    value = getRandomWord(5);
    console.log(`${counter}: ${value}`);
  } while (value !== value.toUpperCase());
};

/*========================
En utilisant un tableau de voyelles que vous créerez "à la main",
écrire une fonction qui génère une chaîne ne contenant que des voyelles (choisies aléatoirement das ce tableau).
*/

const getRandomElement = (list) => {
  if (list.length <= 0) return null;
  const index = Math.floor(Math.random() * list.length);
  return list[index];

  /*
  let shuffled = list
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return shuffled[0];
  */
};

const getRandomVowelsString = (length = 1) => {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
  let res = '';
  for (let i = 0; i < length; i++) {
    res += getRandomElement(vowels);
  }
  return res;
};

const ex3_3 = () => console.log(getRandomVowelsString(5));

/*========================
Saisir un nom puis un prénom.
Renvoyer la concaténation du nom en majuscules et et prénom avec initiale en majuscules et le reste en minuscules (doit gérer les prénoms composés).
*/

const normalizeString = (text) => {
  if (text.length <= 1) return text.toUpperCase();
  return `${text[0].toUpperCase()}${text.substring(1)}`;
};

const normalizeText = (text) => {
  const textParts = text.trim().replaceAll('-', '- ').split(' ');
  const normalizedParts = textParts.map((textPart) =>
    normalizeString(textPart)
  );
  return normalizedParts.join(' ').replaceAll('- ', '-');
};

const printName = (lastName, firstName) => {
  console.log(`Input: ${lastName} ${firstName}`);
  console.log(
    'Output:',
    lastName ? lastName.toUpperCase() : '',
    normalizeText(firstName ? firstName : '')
  );
};

const ex3_4 = () => {
  const lastName = prompt(translator.instance.translate('prompt_lastName'));
  const firstName = prompt(translator.instance.translate('prompt_firstName'));
  printName(lastName, firstName);
};

/*========================
Saisir une chaîne. Renvoyer la chaîne "cryptée" en utilisant les règles suivantes : A=>4, E=>3, G=>6, I=>1, O=>0, S=>5, Z=>2.
Les autres lettres sont inchangées. La conversion de chaque lettre doit se faire que la lettre soit minuscule ou majuscule.
*/

const ex3_5 = () => {
  let encryptedText = prompt(translator.instance.translate('prompt_encrypt'));
  if (!encryptedText) return;

  const changes = {
    A: 4,
    E: 3,
    G: 6,
    I: 1,
    O: 0,
    S: 5,
    Z: 2,
  };

  Object.keys(changes).forEach(
    (key) =>
      (encryptedText = encryptedText
        .replaceAll(key, changes[key])
        .replaceAll(key.toLowerCase(), changes[key]))
  );
  /*
  const changes = ['O', 'I', 'Z', 'E', 'A', 'S', 'G'];
  changes.forEach(
    (char, index) =>
      (encryptedText = encryptedText
        .replaceAll(char, index)
        .replaceAll(char.toLowerCase(), index))
  );
  */

  console.log(encryptedText);
};

/*========================
Écrire une fonction qui affiche tous les entiers entre 1 et n, cette valeur étant saisie par une fonction que vous écrirez. 
L'affichage des entiers est perturbé de la façon suivante :
affichage de "Jazz" si l'entier est un multiple de 3
affichage de "Bundle" si l'entier est un multiple de 5, sauf si cet entier est aussi un multiple de 3, dans ce cas affichage de "Jazz Bundle"
*/

const convertIntToText = (num) => {
  let res = '';
  if (num % 3 === 0) res = 'Jazz';
  if (num % 5 === 0) res += ' Bundle';
  return res.length > 0 ? res.trim() : num;
};

const ex3_6_1 = () => {
  const upTo = prompt(translator.instance.translate('prompt_numberUpTo'));
  for (let i = 1; i <= parseInt(upTo); i++) {
    console.log(`${i}: ${convertIntToText(i)}`);
  }
};

const ex3_6_2 = () => {
  const upTo = prompt(translator.instance.translate('prompt_numberUpTo'));
  const list = [];
  for (let i = 1; i <= parseInt(upTo); i++) {
    list.push(convertIntToText(i));
  }
  console.log(list.join(', '));
};

export { ex3_1, ex3_2, ex3_3, ex3_4, ex3_5, ex3_6_1, ex3_6_2 };

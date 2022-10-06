'use strict';
import { translator } from '../translations/translator.js';

const logWithType = (val) => {
  console.log(val, translator.instance.translate('isOfType', typeof val));
};

/*===============

*/

const ex2_1 = () => {
  let x;
  logWithType(x);

  x = 'blabla';
  logWithType(x);

  x = 'blabla';
  logWithType(x);

  x = `blabla ${x}`;
  logWithType(x);

  x = 9;
  logWithType(x);

  x = 2.5;
  logWithType(x);

  x = true;
  logWithType(x);

  x = undefined;
  logWithType(x);

  x = null;
  logWithType(x);

  x = [1, 2, 3];
  logWithType(x);

  x = new Array();
  logWithType(x);

  x = {};
  logWithType(x);

  x = { promo: 'lpwmce', nb: 25 };
  logWithType(x);

  x = new Date();
  logWithType(x);

  x = function () {
    alert('toto');
  };
  logWithType(x);

  x = 42n;
  logWithType(x);
};

/*========================
L'exercice 2.1 en untilisant un tableau et un loop.
*/

const ex2_1_loop = () => {
  let y;
  logWithType(y);
  const vars = [
    'blabla',
    'blabla',
    `blabla ${y}`,
    9,
    2.5,
    true,
    undefined,
    null,
    [1, 2, 3],
    new Array(),
    {},
    { promo: 'lpwmce', nb: 25 },
    new Date(),
    function () {
      alert('toto');
    },
    42n,
  ];

  // `blabla ${y}` prend la valeur initiale de y et pas la dernière
  // car c'est la valeur au moment de la declaration du string meme
  vars.forEach((item) => logWithType(item));
};

/*========================
Coupez la ligne let x, copiez-la en dernière ligne de votre fonction. Retester votre code.
En gardant la déclaration en dernière ligne de fonction, remplacer let x par var x. 
Retester votre code pour constater la différence.
*/
const ex2_2 = () => {
  console.log(
    'Si "let x" est definit à la fin, il y a une erreure parce que x n\'a pas été definit au moment où on veut changer la valeur.'
  );
  console.log(
    'Comme var est und variable générale, elle est définit avant que les fonctions sont appelées.'
  );
  console.log(
    'C\'est comme la différence entre und "fonction()" et une fonction arrow.'
  );
};

/*
Utiliser les fonctions suivantes pour faire des conversions de type entre chaînes, entiers et réels
  - toString()
  - parseInt(...), Number.parseInt(...)
  - parseFloat(...), Number.parseFloat(...), Number(...)
  - Math.floor(...), Math.ceil(...), Math.round(...)
Essayez également en passant une chaîne à une de ces fonctions.
*/

const logConversions = (name, val) => {
  console.log(`${name}.toString() =`, val.toString());
  console.log(`parseInt(${name}) =`, parseInt(val));
  console.log(`Number.parseInt(${name}) =`, Number.parseInt(val));
  console.log(`parseFloat(${name}) =`, parseFloat(val));
  console.log(`Number.parseFloat(${name}) =`, Number.parseFloat(val));
  console.log(`Number(${name}) =`, Number(val));
  console.log(`Math.floor(${name}) =`, Math.floor(val));
  console.log(`Math.ceil(${name}) =`, Math.ceil(val));
  console.log(`Math.round(${name}) =`, Math.round(val));
};

const ex2_3 = () => {
  const x = Math.random() + 1;
  console.log(translator.instance.translate('xBetween'));
  console.log('x =', x);
  logConversions('x', x);

  const s = 'ABCDE';
  console.log(translator.instance.translate('sDefined'));
  console.log('s =', s);
  logConversions('s', s);
};

/*========================
Déclarer cinq variables.
Comparez-les les unes aux autres avec l'opérateur '==' puis '==='.
*/

let b = false;
let n = 0;
let s = '0';
let tab = [];
let o = {};

const vars = [b, n, s, tab, o];
const ex2_4 = () => {
  const compareToSelf = false;
  const extra = compareToSelf ? 0 : 1;
  for (let i = 0; i < vars.length - extra; i++) {
    for (let j = i + extra; j < vars.length; j++) {
      const outer = vars[i];
      const inner = vars[j];
      console.log(
        outer,
        `(${typeof outer}) == `,
        inner,
        `(${typeof inner}): `,
        outer == inner
      );
      console.log(
        outer,
        `(${typeof outer}) === `,
        inner,
        `(${typeof inner}): `,
        outer === inner
      );
    }
  }
};

export { ex2_1, ex2_1_loop, ex2_2, ex2_3, ex2_4 };

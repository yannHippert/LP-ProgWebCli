'use strict';

const createArticle0 = () => {
  const h2 = document.createElement('h2');
  h2.innerText =
    'Article 0 - Interdiction de doubler, sous peine de disqualification';
  const p = document.createElement('p');
  p.innerText =
    'Il est interdit de vous doubler, sous peine de disqualification!';
  const body = document.querySelector('body');
  body.insertBefore(p, body.firstChild);
  body.insertBefore(h2, body.firstChild);
};

const h2ToUpperCase = () => {
  const headings = document.querySelectorAll('h2');
  headings.forEach((h2) => (h2.innerText = h2.innerText.toUpperCase()));
  //headings.forEach((h2) => (h2.style['text-transform'] = 'uppercase'));
};

const updateArticleNumbers = () => {
  const headings = document.querySelectorAll('h2');
  headings.forEach((h2, index) => {
    //Problème si le titre de l'article contient un autre nombre.
    h2.innerText = h2.innerText.replace(/[0-9]+/g, index + 1);

    //Specifique à la structure du titre
    //const titleParts = h2.innerText.split(' ');
    //titleParts[1] = index + 1;
    //h2.innerText = titleParts.join(' ');
  });
};

const changeBackground = () => {
  const headings = document.querySelectorAll('h2');
  headings.forEach((h2, index) => {
    if (index % 2 === 1) {
      h2.classList.add('bg-color');
      let node = h2;
      while (
        node.nextElementSibling &&
        node.nextElementSibling.nodeName !== 'H2'
      ) {
        node = node.nextElementSibling;
        node.classList.add('bg-color');
      }
    }
  });
};

const combined = () => {
  const headings = document.querySelectorAll('h2');
  headings.forEach((h2, index) => {
    h2.innerText = h2.innerText.toUpperCase().replace(/[0-9]+/g, index + 1);
    if (index % 2 === 1) {
      h2.classList.add('bg-color');
      let node = h2;
      while (
        node.nextElementSibling &&
        node.nextElementSibling.nodeName !== 'H2'
      ) {
        node = node.nextElementSibling;
        node.classList.add('bg-color');
      }
    }
  });
};

const changeInscriptionOrder = () => {
  const h2 = document.getElementsByTagName('h2')[3];
  const p = h2.nextElementSibling.nextElementSibling;
  let uls = [];
  while (p.nextElementSibling && p.nextElementSibling.nodeName === 'UL') {
    const ul = p.nextElementSibling;
    uls.push(ul);
    ul.remove();
  }
  uls = uls.reverse();
  const body = document.querySelector('body');
  const nextP = p.nextElementSibling;
  uls.forEach((ul) => body.insertBefore(ul, nextP));
};

const onLoad = () => {
  createArticle0();

  h2ToUpperCase();
  updateArticleNumbers();
  changeBackground();

  //combined();
  changeInscriptionOrder();
};

window.addEventListener('load', () => onLoad());

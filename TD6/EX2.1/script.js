const createArticle0 = () => {
  const h2 = document.createElement('h2');
  h2.innerText =
    'Article 0 - Interdiction de doubler, sous peine de disqualification';
  const p = document.createElement('p');
  p.innerText =
    'Il est interdit de vous doubler, sous peine de disqualification!';
  $('h2').first().before(h2);
  $('h2').first().after(p);
};

const h2ToUpperCase = () => {
  $('h2').each(function () {
    $(this).html($(this).html().toUpperCase());
  });
};

const updateArticleNumbers = () => {
  $('h2').each(function (index) {
    $(this).html(
      $(this)
        .html()
        .replace(/[0-9]+/g, index + 1)
    );
  });
};

const changeBackground = () => {
  $('h2:nth-of-type(2n)').each(function () {
    $(this)
      .nextUntil('h2')
      .addBack()
      .each(function () {
        $(this).addClass('bg-color');
      });
  });
};

const changeInscriptionOrder = () => {
  $('h2:nth-of-type(4)+p+p')
    .nextUntil('p')
    .each(function () {
      $('h2:nth-of-type(4)+p+p').after($(this));
    });
};

$(document).ready(() => {
  createArticle0();
  h2ToUpperCase();
  updateArticleNumbers();
  changeBackground();
  changeInscriptionOrder();
});

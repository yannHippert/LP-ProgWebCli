const initFieldSizes = () => {
  const container = document.getElementById('fieldSize-container');
  const minSize = 3;
  const maxSize = 8;
  const fieldSizeTemplate = document.getElementById('fieldSize-template');
  for (let i = minSize; i <= maxSize; i++) {
    const fieldSize = fieldSizeTemplate.content.cloneNode(true);
    const input = fieldSize.querySelector('input');
    input.value = i;
    input.id = `size${i}x${i}`;
    const label = fieldSize.querySelector('label');
    label.htmlFor = `size${i}x${i}`;
    label.innerText = `${i}x${i}`;
    container.append(input, label);
  }
};

const onLoad = () => {
  initFieldSizes();
};

window.addEventListener('load', () => onLoad());

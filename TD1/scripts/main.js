'use strict';
import Translator, {
  languageList,
  translator,
} from '../translations/translator.js';
import * as td1_2 from './td1_2.js';
import * as td1_3 from './td1_3.js';
import * as td1_4 from './td1_4_func.js';

let isClearConsoleEnabled;

const tasks = [
  {
    label: 'buttonLabel_clearConsole',
    func: clearConsole,
  },
];

const initCheckBox = () => {
  const checkBox = document.querySelector('#input_clearConsole');
  isClearConsoleEnabled = checkBox.checked;
  checkBox.addEventListener('change', () => {
    isClearConsoleEnabled = checkBox.checked;
  });
};

const initTasks = () => {
  const imports = [td1_2, td1_3, td1_4];
  imports.forEach((imp) => {
    Object.keys(imp).forEach((key) => {
      tasks.push({
        label: `buttonLabel_${key}`,
        func: imp[key],
      });
    });
  });
};

const createButtons = () => {
  const buttonsDiv = document.querySelector('#buttons');
  buttonsDiv.innerHTML = '';
  tasks.forEach((task) => {
    const button = document.createElement('button');
    button.textContent = translator.instance.translate(task.label);
    button.addEventListener('click', () => callFunction(task.func));
    buttonsDiv.append(button);
  });
  const label = document.querySelector('label');
  label.innerText = translator.instance.translate('buttonLabel_clearConsole');
};

const callFunction = (func) => {
  if (isClearConsoleEnabled) clearConsole();
  func();
};

const changeSelectedLanguage = (lang) => {
  const spans = document.querySelector('#language-selector').childNodes;
  spans.forEach((span) => {
    span.classList.remove('selected');
    if (lang.label === span.innerText) span.classList.add('selected');
  });
  translator.instance.setLanguage(lang);

  createButtons();
};

const initTranslator = () => {
  new Translator();
  //Creation of the language selectors
  const langaugeContainer = document.querySelector('#language-selector');
  languageList.forEach((lang) => {
    const span = document.createElement('span');
    span.innerText = lang.label;
    if (lang === translator.instance.getLanguage())
      span.classList.add('selected');
    span.addEventListener('click', () => changeSelectedLanguage(lang));
    langaugeContainer.append(span);
  });
};

function clearConsole() {
  console.clear();
}

const onLoad = () => {
  initTranslator();
  initCheckBox();
  initTasks();
  createButtons();
};

window.addEventListener('load', () => onLoad());

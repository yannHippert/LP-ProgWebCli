'use strict';

import FR from './FR.json' assert { type: 'json' };
import EN from './EN.json' assert { type: 'json' };

const wildcard = '%$%';

const languages = {
  FR: { label: 'FR', translations: FR },
  EN: { label: 'EN', translations: EN },
};

const languageList = [languages.FR, languages.EN];

const _translator = {
  instance: undefined,
};

class Translator {
  constructor() {
    _translator.instance = this;

    this.language = languages.FR;
  }

  translate(name, ...params) {
    let translation = this.language.translations[name];
    if (translation === undefined)
      translation = languages.EN.translations[name];
    if (translation === undefined) return 'No translation found!';
    params.forEach(
      (replacement) =>
        (translation = translation.replace(wildcard, replacement))
    );
    return translation;
  }

  getLanguage() {
    return this.language;
  }

  setLanguage(lang) {
    this.language = lang;
  }
}

const translator = _translator;

export default Translator;
export { languages, languageList, translator };

// jshint esversion: 6

const translations = {
  de: {
    'clear': 'löschen',
    'Add User':'Neuer Nutzer',
    'Sum':'Summe',
    'Select link':'Link kopieren',
    'Share the current state by copying this link.':'Teile den aktuellen Stand durch Kopieren dieses Links.',
    'The link will change with each change you make.':'Der Link ändert sich bei jeder Änderung der Daten.',
    'What?':'Was?',
    'Expense':'Ausgabenbeschreibung',
    'How much?':'Wie teuer war`s?',
    'Who payed it?':'Wer hat`s bezahlt?',
    'Who enjoyed it?':'Wer waren die Nutznießer?',
    'Copied!':'Kopiert!'
  }
};

let isin = (arr, e) => arr.indexOf(e) >= 0;

let language = "de";

function t(key) {
  if (isin(Object.keys(translations), language)) {
    if (translations[language][key]) {
      return translations[language][key];
    } else {
      console.log("Translate me for " + language + ": '" + key + "'");
      return key;
    }
  } else {
    return key;
  }
}

t.setLanguage = lang => {
  language = lang;
};

t.getLanguages = () => {
  return [...Object.keys(translations), "en"];
};

t.currentLanguage = () => language;

export default t;

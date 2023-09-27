// jshint esversion: 6

const translations = {
  en: {
    "description_simple": `This strategy sorts expenses and incomes by amounts and settles debts and credits by creating transactions between users. It processes financial transactions one after the other.`,
    "description_advanced": `In contrast to the "Simple" strategy, this method also considers positive and negative amounts and generates transactions between users. However, transactions are created in a specific order, depending on users' financial obligations.`,
    "description_largest_bulk": `This strategy aims to efficiently balance debts and credits. It sorts users based on their financial obligations and conducts transactions between the most indebted and least indebted users. This process is iteratively repeated until all debts are settled or a certain number of steps is reached.`
  },
  de: {
    "simple": "naive Überweisungskette",
    "advanced": "bessere Überweisungskette",
    "largest bulk": "die dicksten Brocken zuerst",
   "description_simple": `Diese Strategie ordnet Ausgaben und Einnahmen nach Beträgen und gleicht Schulden und Guthaben aus, indem sie Transaktionen zwischen den Nutzern erstellt. Dabei werden die finanziellen Transaktionen nacheinander verarbeitet.`,
   "description_advanced": `Im Gegensatz zur "Simple" Strategie berücksichtigt diese Methode auch positive und negative Beträge und erstellt Transaktionen zwischen den Nutzern. Die Transaktionen werden jedoch in einer bestimmten Reihenfolge erstellt, abhängig von den finanziellen Verpflichtungen der Nutzer.`,
    "description_largest_bulk":`Diese Strategie zielt darauf ab, Schulden und Guthaben effizient auszugleichen. Sie sortiert die Nutzer basierend auf ihren finanziellen Verpflichtungen und führt Transaktionen zwischen dem am meisten verschuldeten und dem am wenigsten verschuldeten Nutzer durch. Dieser Prozess wird iterativ wiederholt, bis alle Schulden ausgeglichen sind oder eine bestimmte Anzahl von Schritten erreicht ist.`,
    clear: "löschen",
    "Add User": "Neuer Nutzer",
    Sum: "Summe",
    "Select link": "Link kopieren",
    "Share the current state by copying this link.":
      "Teile den aktuellen Stand durch Kopieren dieses Links.",
    "The link will change with each change you make.":
      "Der Link ändert sich bei jeder Änderung der Daten.",
    "What?": "Was?",
    Expense: "Ausgabenbeschreibung",
    "How much?": "Wie teuer war`s?",
    "Who payed it?": "Wer hat`s bezahlt?",
    "Who enjoyed it?": "Wer waren die Nutznießer?",
    "Copied!": "Kopiert!",
    "John Doe": "Max Mustermann",
    pays: "zahlt",
    Split: "Teilen",
  },
};

let isin = (arr, e) => arr.indexOf(e) >= 0;

let language = "de";

function t(key) {
  console.log('t:::',key,language)
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

t.setLanguage = (lang) => {
  language = lang;
};

t.getLanguages = () => {
  return [...Object.keys(translations)];
};

t.currentLanguage = () => language;

export default t;

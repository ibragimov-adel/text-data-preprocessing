from spacy import load

nlp = load("ru_core_news_sm")
nlp.max_length = 2000000

def func(text):
  doc = nlp(text)
  lemma = ([n.lemma_ for n in doc])
  return ' '.join(lemma)

def lemmatize(text):
  return list(map(func, text))
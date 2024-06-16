from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

def create_func(use_default, extra_stop_words):
  def func(text):
    stop_words = set(stopwords.words('russian'))
    tokens = word_tokenize(text)
    tokens = [t for t in tokens if t not in stop_words and t not in extra_stop_words]
    return ' '.join(tokens)
  return func

def remove_stopwords(text, use_default=True, extra_stop_words=[]):
  return list(map(create_func(use_default, extra_stop_words), text))
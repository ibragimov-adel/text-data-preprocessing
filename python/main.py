import io
import nltk
from flask import Flask, request
from functions import remove_punctuation, lemmatize, remove_whitespace, lowercase, remove_stopwords, split_sentences, ngrams

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')
nltk.download('averaged_perceptron_tagger_ru')

test_text = "Мы будем работать над проектом завтра. Я купил новые ботинки для этого события."

app = Flask(__name__)

def preprocess_text(text, settings = {}):
  result = ''

  if settings.get('split_sentences'):
    result = split_sentences(text)
  else:
    result = [text]

  if settings.get('remove_punctuation'):
    result = remove_punctuation(result)
  
  if settings.get('remove_whitespace'):
    result = remove_whitespace(result)
  
  if settings.get('lowercase'):
    result = lowercase(result)

  if settings.get('lemmatize'):
    result = lemmatize(result)
  
  if settings.get('remove_stopwords'):
    stopwords = settings.get('stopwords')
    stopwords = stopwords.split(',') if stopwords else []
    result = remove_stopwords(result, use_default=settings.get('use_default_stopwords_list'), extra_stop_words=stopwords)
  
  if settings.get('ngrams'):
    n = settings.get('n_grams_length')
    grams = ngrams(result, n)

  return result

@app.route('/preprocess', methods=['POST'])
def preprocess():
  file = request.files.get('file')
  content = file.read().decode('utf-8')

  settings = request.form

  result = preprocess_text(content, settings)

  separator = settings.get('sentences_separator')
  separator = separator if separator else '\n'
  return separator.join(result)

if __name__ == '__main__':
  app.run(debug=True)

import re

def func(text):
  return re.sub(r'[^\w\s]', ' ', text)

def remove_punctuation(text):
  return list(map(func, text))
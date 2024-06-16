def func(text):
  return ' '.join(text.split())

def remove_whitespace(text):
  return list(map(func, text))
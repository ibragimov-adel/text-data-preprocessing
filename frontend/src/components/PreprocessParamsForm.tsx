import { Box, Button, Checkbox, Flex, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { api } from '../api';

type Props = {
  id: number;
  onFinish: () => void;
};

export const PreprocessParamsForm = ({ id, onFinish }: Props) => {
  const [loading, setLoading] = useState(false);
  const [removePunctuation, setRemovePunctuation] = useState(true);
  const [removeWhitespace, setRemoveWhitespace] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [splitSentences, setSplitSentences] = useState(false);
  const [sentencesSeparator, setSentencesSeparator] = useState('\n');
  const [lemmatization, setLemmatization] = useState(false);
  const [removeStopwords, setRemoveStopwords] = useState(false);
  const [stopwords, setStopwords] = useState('');
  const [useDefaultStopwords, setUseDefaultStopwords] = useState(false);

  const onStart = () => {
    setLoading(true);

    api
      .post(`/projects/${id}/preprocess`, {
        removePunctuation,
        removeWhitespace,
        lowercase,
        splitSentences,
        sentencesSeparator,
        lemmatization,
        removeStopwords,
        stopwords,
      })
      .finally(() => {
        setLoading(false);
        onFinish();
      });
  };

  return (
    <Flex direction="column" flex="1" justifyContent="space-between" gap={16}>
      <Flex direction="column" gap={6}>
        <Checkbox
          size="lg"
          isChecked={removePunctuation}
          onChange={(e) => setRemovePunctuation(e.target.checked)}
        >
          Удаление знаков препинания
        </Checkbox>

        <Checkbox
          size="lg"
          isChecked={removeWhitespace}
          onChange={(e) => setRemoveWhitespace(e.target.checked)}
        >
          Удаление лишних пробелов и переносов строк
        </Checkbox>

        <Checkbox
          size="lg"
          isChecked={lowercase}
          onChange={(e) => setLowercase(e.target.checked)}
        >
          Приведение к нижнему регистру
        </Checkbox>

        <Flex direction="column" gap={2}>
          <Checkbox
            size="lg"
            isChecked={splitSentences}
            onChange={(e) => setSplitSentences(e.target.checked)}
          >
            Разделить на предложения
          </Checkbox>

          {splitSentences && (
            <Input
              placeholder="Разделитель"
              value={sentencesSeparator}
              onChange={(e) => setSentencesSeparator(e.target.value)}
            />
          )}
        </Flex>

        <Checkbox
          size="lg"
          isChecked={lemmatization}
          onChange={(e) => setLemmatization(e.target.checked)}
        >
          Лемматизация
        </Checkbox>

        <Flex direction="column" gap={2}>
          <Checkbox
            size="lg"
            isChecked={removeStopwords}
            onChange={(e) => setRemoveStopwords(e.target.checked)}
          >
            Удалить стоп-слова
          </Checkbox>

          {removeStopwords && (
            <>
              <Input
                placeholder="Введите список слов без пробелов, разделенных запятой"
                value={stopwords}
                onChange={(e) => setStopwords(e.target.value)}
              />

              <Checkbox
                size="lg"
                isChecked={useDefaultStopwords}
                onChange={(e) => setUseDefaultStopwords(e.target.checked)}
              >
                Использовать стандартный список стоп-слов
              </Checkbox>
            </>
          )}
        </Flex>
      </Flex>
      <Box>
        <Button colorScheme="purple" onClick={onStart} isLoading={loading}>
          Начать
        </Button>
      </Box>
    </Flex>
  );
};

import {
  Flex,
  Grid,
  GridItem,
  Heading,
  ListItem,
  Spinner,
  UnorderedList,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectType } from '../../utils/types';
import { api, API_URL } from '../../api';
import { PreprocessParamsForm } from '../../components';
import moment from 'moment';

export const ProjectPage = () => {
  const { id } = useParams();

  const [project, setProject] = useState<ProjectType>();
  const [loading, setLoading] = useState(false);

  const fetchProjectById = () => {
    setLoading(true);

    api
      .get(`/projects/${id}`)
      .then((response) => setProject(response.data))
      .finally(() => setLoading(false));
  };

  const onFinish = () => {
    fetchProjectById();
  };

  useEffect(() => {
    fetchProjectById();
  }, [id]);

  if (loading && !project) {
    return <Spinner />;
  }

  if (!id) {
    return null;
  }

  return (
    <Grid templateColumns="1fr 300px" gap={6} h="100%">
      <GridItem>
        <Flex direction="column" gap={8} h="100%">
          <Heading as="h2" size="lg">
            {project?.name}
          </Heading>

          <PreprocessParamsForm id={+id} onFinish={onFinish} />
        </Flex>
      </GridItem>

      <GridItem>
        <Flex direction="column" gap={6}>
          <Heading as="h4" size="sm">
            История:
          </Heading>

          <UnorderedList>
            {project?.history.map((item) => (
              <ListItem
                fontSize={18}
                _hover={{ textDecor: 'underline', cursor: 'pointer' }}
                onClick={() => onHistoryClick(item.id)}
              >
                <a href={`${API_URL}/projects/history/${item.id}`}>
                  {item.fileUrl} ({moment(item.date).format('DD.MM.YYYY HH:mm')}
                  )
                </a>
              </ListItem>
            ))}
          </UnorderedList>
        </Flex>
      </GridItem>
    </Grid>
  );
};

import { useEffect, useState } from 'react';
import { ProjectType } from '../utils/types';
import { api } from '../api';
import {
  Card,
  CardBody,
  Flex,
  Heading,
  IconButton,
  Skeleton,
  Stack,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

export const ProjectList = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onCardClick = (id: number) => {
    navigate(`/projects/${id}`);
  };

  const fetchProjects = () => {
    setLoading(true);
    api
      .get('/projects')
      .then((response) => setProjects(response.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Flex direction="column" gap={4}>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h3" size="md">
          Проекты
        </Heading>

        <IconButton
          aria-label="Обновить"
          icon={<RepeatIcon />}
          onClick={() => fetchProjects()}
        />
      </Flex>

      {loading ? (
        <Stack>
          <Skeleton h="20px" />
          <Skeleton h="20px" />
          <Skeleton h="20px" />
        </Stack>
      ) : (
        <Flex direction="column" gap={2}>
          {projects.map((project) => (
            <Card
              key={project.id}
              _hover={{ background: 'rgba(0, 0, 0, .05)', cursor: 'pointer' }}
              size="sm"
              onClick={() => onCardClick(project.id)}
            >
              <CardBody>{project.name}</CardBody>
            </Card>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

import { Box, Button, Flex } from '@chakra-ui/react';
import { ProjectList } from './ProjectList';
import { AddIcon } from '@chakra-ui/icons';
import { CreateProjectModal } from './CreateProjectModal';
import { useState } from 'react';

export const Sidebar = () => {
  const [createProjectModalOpened, setCreateProjectModalOpened] =
    useState(false);

  return (
    <>
      <Box boxShadow="base" p={6} h="100%" rounded="20px" bg="white">
        <Flex direction="column" h="100%">
          <Box flex="1">
            <ProjectList />
          </Box>
          <Button
            colorScheme="purple"
            rightIcon={<AddIcon />}
            onClick={() => setCreateProjectModalOpened(true)}
          >
            Создать проект
          </Button>
        </Flex>
      </Box>

      <CreateProjectModal
        isOpen={createProjectModalOpened}
        onClose={() => setCreateProjectModalOpened(false)}
      />
    </>
  );
};

import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useState } from 'react';
import { api } from '../api';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateProjectModal = ({ isOpen, onClose }: Props) => {
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>();
  const [loading, setLoading] = useState(false);

  const onSave = () => {
    if (!name || !file) {
      return;
    }

    setLoading(true);
    const formData = new FormData();

    formData.append('file', file);
    formData.append('name', name);

    api
      .post(`/projects`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(() => onClose())
      .finally(() => setLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Создание проекта</ModalHeader>

        <ModalBody>
          <Flex direction="column" gap={6}>
            <Input
              placeholder="Название"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              type="file"
              onChange={(e) => setFile(e.target.files && e.target.files[0])}
            />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="purple"
            mr={3}
            onClick={onSave}
            isLoading={loading}
          >
            Сохранить
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Отмена
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

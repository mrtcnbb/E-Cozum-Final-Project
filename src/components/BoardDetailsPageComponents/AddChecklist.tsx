import {
  Box,
  Button,
  Icon,
  IconButton,
  Input,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  usePopoverContext,
} from '@chakra-ui/react';
import React, { FC, useState, useRef } from 'react';
import { BiCheckSquare } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import { fetchBoard } from '../../features/boardSlice';
import authRequest from '../../service/authRequest';
import { useAppDispatch } from '../../store';

interface AddChecklistProps {
  cardId: number;
}

const AddChecklist: FC<AddChecklistProps> = ({ cardId }) => {
  const [createChecklistObject, setCreateChecklistObject] = useState({
    title: '',
    cardId: cardId,
  });

  const { onOpen, onClose, isOpen } = useDisclosure();

  const { id } = useParams();
  const dispatch = useAppDispatch();

  const onCreateChecklist = (event: any) => {
    setCreateChecklistObject((prev) => ({ ...prev, title: event.target.value }));
  };

  const addChecklist = () => {
    authRequest()
      .post('checklist', createChecklistObject)
      .then(() => {
        dispatch(fetchBoard(id!));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Popover
      onOpen={onOpen}
      onClose={onClose}
      isOpen={isOpen}
      closeOnBlur={true}
      direction="ltr"
      placement="bottom-start"
    >
      <PopoverTrigger>
        <IconButton
          size="lg"
          aria-label="add checklist"
          bg="none"
          color="white"
          rounded="full"
          fontSize="2xl"
          mx="-10px"
          mb="7px"
          _hover={{ background: 'none' }}
          _focus={{ outline: '0', background: 'none' }}
          sx={{ _active: 'false' }}
          icon={<BiCheckSquare />}
        />
      </PopoverTrigger>
      <PopoverContent _focus={{ outline: '0' }} mt="7px">
        <PopoverBody display={'flex'} flexDirection="column" gap={'10px'}>
          <Input
            placeholder="Checklist title"
            value={createChecklistObject.title}
            onChange={(event) => onCreateChecklist(event)}
          />
          <Button
            disabled={createChecklistObject.title.trim() === ''}
            onClick={() => {
              addChecklist();
              onClose();
              setCreateChecklistObject((prev) => ({ ...prev, title: '' }));
            }}
            ml={'auto'}
            rounded={'full'}
            colorScheme="teal"
          >
            Add
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default AddChecklist;

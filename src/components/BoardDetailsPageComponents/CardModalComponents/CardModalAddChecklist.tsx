import {
  Button,
  IconButton,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { BiCheckSquare } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import { fetchBoard } from '../../../features/boardSlice';
import useCardToast from '../../../hooks/useCardToast';
import authRequest from '../../../service/authRequest';
import { useAppDispatch } from '../../../store';

interface CardModalAddChecklistProps {
  cardId: number;
}

const CardModalAddChecklist: FC<CardModalAddChecklistProps> = ({ cardId }) => {
  const [createChecklistObject, setCreateChecklistObject] = useState({
    title: '',
    cardId: cardId,
  });

  const { onOpen, onClose, isOpen } = useDisclosure();

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { showToast } = useCardToast();

  const onCreateChecklist = (event: any) => {
    setCreateChecklistObject((prev) => ({ ...prev, title: event.target.value }));
  };

  const addChecklist = () => {
    authRequest()
      .post('checklist', createChecklistObject)
      .then(() => {
        dispatch(fetchBoard(id!));
        showToast();
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

export default CardModalAddChecklist;

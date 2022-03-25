import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, Button, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBoard } from '../../features/boardSlice';
import authRequest from '../../service/authRequest';
import { useAppDispatch } from '../../store';

interface EditableAddButtonProps {
  item: 'list' | 'card';
  listId?: number;
}

interface CreateListProps {
  title: string;
  boardId: number | null;
}

interface CreateCardProps {
  title: string;
  listId: number | null;
  description: string;
}

const EditableAddButton: FC<EditableAddButtonProps> = ({ item, listId }) => {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const [addItem, setAddItem] = useState(false);

  const [createListObject, setCreateListObject] = useState<CreateListProps>({
    title: '',
    boardId: Number(id),
  });

  const [createCardObject, setCreateCardObject] = useState<CreateCardProps>({
    title: '',
    listId: listId!,
    description: '',
  });

  const createList = () => {
    authRequest()
      .post('list', createListObject)
      .then(() => {
        dispatch(fetchBoard(id!));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createCard = () => {
    authRequest()
      .post('card', createCardObject)
      .then(() => {
        dispatch(fetchBoard(id!));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleItemNameEntry = () => {
    if (item === 'list' ? createListObject.title.trim() === '' : createCardObject.title.trim() === '') {
      alert('Bu alan boş bırakılamaz!');
    } else {
      if (item === 'list') {
        createList();
        setCreateListObject((prev) => ({ ...prev, title: '' }));
        setAddItem(false);
      } else {
        createCard();
        setCreateCardObject((prev) => ({ ...prev, title: '' }));
        setAddItem(false);
      }
    }
  };

  const onListTextChange = (event: any) => {
    setCreateListObject((prev) => ({ ...prev, title: event.target.value }));
  };

  const onCardTextChange = (event: any) => {
    setCreateCardObject((prev) => ({ ...prev, title: event.target.value }));
  };

  return (
    <Box
      display="flex"
      alignItems="flex-start"
      border={item === 'list' ? '1px' : 'none'}
      borderColor="rgb(230,230,230)"
      p={item === 'card' ? '2' : '3.5'}
      backgroundColor="#F9F9F9"
      boxShadow={item === 'card' ? 'none' : 'md'}
      width={item === 'card' ? 'full' : '320px'}
      borderRadius="2xl"
    >
      {!addItem ? (
        <Box onClick={() => setAddItem(true)} width={320}>
          <Button
            leftIcon={
              <AddIcon
                boxSize={item === 'list' ? '7' : '3'}
                color={item === 'list' ? 'white' : 'black'}
                bg={item === 'list' ? 'orangered' : 'none'}
                p={item === 'list' ? '1.5' : '0'}
                borderRadius="full"
              />
            }
            fontWeight="normal"
            colorScheme="teal"
            variant="none"
          >
            Add a {item}
          </Button>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="flex-start" width={320} gap="5">
          <Box width={'full'}>
            <InputGroup>
              <Input
                width={'full'}
                placeholder={`${item} name`}
                borderColor="black"
                value={item === 'list' ? createListObject.title : createCardObject.title}
                onChange={(event: any) => {
                  if (item === 'list') {
                    onListTextChange(event);
                  } else {
                    onCardTextChange(event);
                  }
                }}
              />
              <InputRightElement
                onClick={() => {
                  if (item === 'list') setCreateListObject({ title: '', boardId: null });
                  setAddItem(false);
                }}
              >
                <IconButton
                  isRound={true}
                  size="sm"
                  variant="none"
                  color="gray.300"
                  aria-label="edit name"
                  _hover={{ color: 'gray.400', bg: 'gray.200' }}
                  icon={<CloseIcon />}
                />
              </InputRightElement>
            </InputGroup>
          </Box>
          <Box>
            <Button
              disabled={item === 'list' ? createListObject.title.trim() === '' : createCardObject.title.trim() === ''}
              colorScheme="teal"
              size="sm"
              variant="solid"
              borderRadius="100"
              onClick={() => {
                handleItemNameEntry();
                setAddItem(false);
              }}
            >
              Add
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default EditableAddButton;

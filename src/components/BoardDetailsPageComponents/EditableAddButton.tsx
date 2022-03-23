import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, Button, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBoard } from '../../features/boardSlice';
import authRequest from '../../service/authRequest';
import { useAppDispatch } from '../../store';

interface EditableAddButtonProps {
  item: 'list' | 'card';
}

interface CreateListProps {
  title: string;
  boardId: number | null;
}

interface CreateCardProps {
  title: string;
  listId: number | null;
}

const EditableAddButton: FC<EditableAddButtonProps> = ({ item }) => {
  const { id } = useParams();
  const [addItem, setAddItem] = useState(false);

  const dispatch = useAppDispatch();

  const [createListObject, setCreatelistObject] = useState<CreateListProps>({
    title: '',
    boardId: Number(id),
  });

  const [createCardObject, setCreateCardObject] = useState<CreateCardProps>({
    title: '',
    listId: null,
  });

  //TODO: CREATE LİST POST HAZIRLA
  const createList = () => {
    authRequest()
      .post('list', createListObject)
      .then((res) => {
        dispatch(fetchBoard(id!));
      });
  };

  const handleItemNameEntry = () => {
    if (createListObject.title.trim() === '') {
      alert('Bu alan boş bırakılamaz!');
    } else {
      if (item === 'list') {
        createList();
        setAddItem(false);
      }
    }
  };

  const onListTextChange = (event: any) => {
    setCreatelistObject((prev) => ({ ...prev, title: event.target.value }));
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
        <Box display="flex" flexDirection="column" alignItems="flex-start" width="full" gap="5">
          <Box width="full">
            <InputGroup>
              <Input
                width={'full'}
                placeholder={`${item} name`}
                borderColor="black"
                value={item === 'list' ? createListObject.title : createCardObject.title}
                onChange={(event: any) => {
                  if (item === 'list') {
                    onListTextChange(event);
                    console.log(event.target.value);
                  }
                }}
              />
              <InputRightElement
                onClick={() => {
                  if (item === 'list') setCreatelistObject({ title: '', boardId: null });
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
              disabled={createListObject.title.trim() === ''}
              colorScheme="teal"
              variant="solid"
              borderRadius="100"
              onClick={() => {
                if (item === 'list') {
                  handleItemNameEntry();
                }
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

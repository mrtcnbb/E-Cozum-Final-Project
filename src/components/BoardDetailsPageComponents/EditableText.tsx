import { FC, useState } from 'react';
import { Box, IconButton, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import authRequest from '../../service/authRequest';
import { useParams } from 'react-router-dom';

interface EditableTextProps {
  editItemName: boolean;
  textSize: string;
  textColor: string;
  boardName?: string;
  boardId?: string;
  listName?: string;
  listId?: number;
  item?: string;
  handleEditItemName: (isEditable: boolean) => void;
}

interface UpdateBoardTitleBody {
  title: string;
}

interface UpdateListTitleBody {
  title: string;
  boardId: number;
}

const EditableText: FC<EditableTextProps> = ({
  editItemName,
  textSize,
  textColor,
  boardName,
  boardId,
  listName,
  listId,
  item,
  handleEditItemName,
}) => {
  const { id } = useParams();

  const [boardsName, setBoardsName] = useState<UpdateBoardTitleBody>({
    title: boardName!,
  });

  const [listsName, setListsName] = useState<UpdateListTitleBody>({
    title: listName!,
    boardId: Number(id),
  });

  const updateBoardTitle = (boardId: string) => {
    authRequest()
      .put(`board/${boardId}`, boardsName)
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  const updateListTitle = (listId: number) => {
    authRequest()
      .put(`list/${listId}`, listsName)
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBoardNameEntry = (boardId: string) => {
    if (boardsName.title.trim() === '') {
      alert('Bu alan boş bırakılamaz!');
    } else {
      updateBoardTitle(boardId);
      handleEditItemName(false);
    }
  };

  const handleListNameEntry = (listId: number) => {
    if (listsName.title.trim() === '') {
      alert('Bu alan boş bırakılamaz!');
    } else {
      updateListTitle(listId!);
      handleEditItemName(false);
    }
  };

  const onBoardTextChange = (event: any) => {
    setBoardsName((prev) => ({ ...prev, title: event.target.value }));
  };

  const onListTextChange = (event: any) => {
    setListsName((prev) => ({ ...prev, title: event.target.value }));
  };

  return (
    <Box marginTop="2.5" pl={4}>
      {!editItemName ? (
        <Text
          color={textColor}
          fontWeight="semibold"
          fontSize={textSize}
          _hover={{ cursor: 'pointer' }}
          onClick={() => handleEditItemName(true)}
        >
          {item === 'list' ? listsName.title : boardsName.title}
        </Text>
      ) : (
        <InputGroup>
          <Input
            color={textColor}
            borderColor="black"
            value={item === 'list' ? listsName.title : boardsName.title}
            onChange={(event: any) => {
              if (item === 'list') {
                onListTextChange(event);
              } else {
                onBoardTextChange(event);
              }
            }}
          />
          <InputRightElement
            onClick={() => {
              if (item === 'list') {
                handleListNameEntry(listId!);
              } else {
                handleBoardNameEntry(id!);
              }
            }}
          >
            <IconButton
              isRound={true}
              size="sm"
              variant="none"
              color="gray.300"
              aria-label="edit name"
              _hover={{ color: 'gray.400', bg: 'gray.200' }}
              icon={<CheckIcon />}
            />
          </InputRightElement>
        </InputGroup>
      )}
    </Box>
  );
};

export default EditableText;

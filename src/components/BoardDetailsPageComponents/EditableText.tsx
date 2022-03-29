import { FC, useState } from 'react';
import { Box, IconButton, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import authRequest from '../../service/authRequest';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { fetchBoard } from '../../features/boardSlice';

interface EditableTextProps {
  editItemName: boolean;
  textSize: string;
  textColor: string;
  listName?: string;
  listId?: number;
  checklistId?: number;
  checklistName?: string;
  item?: string;
  handleEditItemName: (isEditable: boolean) => void;
}
interface UpdateListTitleBody {
  title: string;
  boardId: number;
}

interface UpdateChecklistTitleBody {
  title: string;
}

const EditableText: FC<EditableTextProps> = ({
  editItemName,
  textSize,
  textColor,
  listName,
  listId,
  checklistId,
  checklistName,
  item,
  handleEditItemName,
}) => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const [listsName, setListsName] = useState<UpdateListTitleBody>({
    title: listName!,
    boardId: Number(id),
  });

  const [checklistsName, setChecklistsName] = useState<UpdateChecklistTitleBody>({
    title: checklistName!,
  });

  const updateListTitle = (listId: number) => {
    authRequest()
      .put(`list/${listId}`, listsName)
      .then(() => {
        dispatch(fetchBoard(id!));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateChecklistTitle = (checklistId: number) => {
    authRequest()
      .put(`checklist/${checklistId}`, checklistsName)
      .then(() => {
        dispatch(fetchBoard(id!)).catch((error) => {
          console.log(error);
        });
      });
  };

  const handleListNameEntry = (listId: number) => {
    if (listsName.title.trim() === '') {
      alert('Bu alan boş bırakılamaz!');
    } else {
      updateListTitle(listId!);
      handleEditItemName(false);
    }
  };

  const handleChecklistNameEntry = (checklistId: number) => {
    if (checklistsName.title.trim() === '') {
      alert('Bu alan boş bırakılamaz!');
    } else {
      updateChecklistTitle(checklistId!);
      handleEditItemName(false);
    }
  };

  const onListTextChange = (event: any) => {
    setListsName((prev) => ({ ...prev, title: event.target.value }));
  };

  const onChecklistTextChange = (event: any) => {
    setChecklistsName((prev) => ({ ...prev, title: event.target.value }));
  };

  return (
    <Box marginTop="2.5" pl={item === 'Checklist' ? 0 : 4}>
      {!editItemName ? (
        <Text
          color={textColor}
          fontWeight="semibold"
          fontSize={item === 'Checklist' ? 'lg' : textSize}
          _hover={{ cursor: 'pointer' }}
          onClick={() => handleEditItemName(true)}
        >
          {item === 'list' ? listsName.title : checklistsName.title}
        </Text>
      ) : (
        <InputGroup>
          <Input
            color={textColor}
            borderColor="black"
            value={item === 'list' ? listsName.title : checklistsName.title}
            onChange={(event: any) => {
              if (item === 'list') {
                onListTextChange(event);
              } else if (item === 'Checklist') {
                onChecklistTextChange(event);
              }
            }}
          />
          <InputRightElement
            onClick={() => {
              if (item === 'list') {
                handleListNameEntry(listId!);
              } else if (item === 'Checklist') {
                handleChecklistNameEntry(checklistId!);
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

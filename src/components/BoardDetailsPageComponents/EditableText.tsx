import React, { FC, useEffect, useState } from 'react';
import { Box, IconButton, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import authRequest from '../../service/authRequest';
import { fetchBoard } from '../../features/boardSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import { useParams } from 'react-router-dom';

interface EditableTextProps {
  editItemName: boolean;
  textSize: string;
  textColor: string;
  boardName?: string;
  boardId?: string;
  handleEditItemName: (isEditable: boolean) => void;
}

interface UpdateTitleBody {
  title: string;
}

const EditableText: FC<EditableTextProps> = ({
  editItemName,
  textSize,
  textColor,
  boardName,
  boardId,
  handleEditItemName,
}) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBoard(id as string));
  }, []);

  const [listName, setListName] = useState<UpdateTitleBody>({
    title: boardName!,
  });

  const updateTitle = (boardId: string) => {
    authRequest()
      .put(`board/${boardId}`, listName)
      .then((res) => {
        dispatch(fetchBoard(boardId!));
      });
  };

  const handleItemNameEntry = (boardId: string) => {
    if (listName.title.trim() === '') {
      alert('Bu alan boş bırakılamaz!');
    } else {
      updateTitle(boardId);
      handleEditItemName(false);
    }
  };

  const onTextChange = (event: any) => {
    setListName((prev) => ({ ...prev, title: event.target.value }));
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
          {listName.title}
        </Text>
      ) : (
        <InputGroup>
          <Input
            color={textColor}
            borderColor="black"
            value={listName.title}
            onChange={(event: any) => onTextChange(event)}
          />
          <InputRightElement
            onClick={() => {
              handleItemNameEntry(id!);
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

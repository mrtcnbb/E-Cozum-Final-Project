import React, { FC, useState } from 'react';
import { Box, IconButton, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

interface EditableTextProps {
  editItemName: boolean;
  textSize: string;
  textColor: string;
  handleEditItemName: (isEditable: boolean) => void;
}

const EditableText: FC<EditableTextProps> = ({ editItemName, textSize, textColor, handleEditItemName }) => {
  const [listName, setListName] = useState('trial list');

  const handleItemNameEntry = () => {
    if (listName.trim() === '') {
      alert('Bu alan boş bırakılamaz!');
    } else {
      handleEditItemName(false);
    }
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
          {listName}
        </Text>
      ) : (
        <InputGroup>
          <Input color={textColor} borderColor="black" value={listName} onChange={(e) => setListName(e.target.value)} />
          <InputRightElement
            onClick={() => {
              handleItemNameEntry();
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

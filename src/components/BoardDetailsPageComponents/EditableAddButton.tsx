import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, Button, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { FC, useState } from 'react';

interface EditableAddButtonProps {
  item: 'list' | 'card';
}

const EditableAddButton: FC<EditableAddButtonProps> = ({ item }) => {
  const [addItem, setAddItem] = useState(false);
  const [itemName, setItemName] = useState('');

  const handleItemNameEntry = () => {
    if (itemName.trim() === '') {
      alert('Bu alan boş bırakılamaz!');
    } else {
      setAddItem(false);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="flex-start"
      border="1px"
      borderColor="rgb(230,230,230)"
      p={item === 'card' ? '2' : '3.5'}
      backgroundColor="#F9F9F9"
      boxShadow={item === 'card' ? 'none' : 'md'}
      width={item === 'card' ? 'full' : '320px'}
      borderRadius="2xl"
    >
      {!addItem ? (
        <Box onClick={() => setAddItem(true)}>
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
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <InputRightElement
                onClick={() => {
                  setItemName('');
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
              disabled={itemName.trim() === ''}
              colorScheme="teal"
              variant="solid"
              borderRadius="100"
              onClick={() => {
                handleItemNameEntry();
                setItemName('');
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

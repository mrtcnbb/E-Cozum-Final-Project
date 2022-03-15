import { Box, Button } from '@chakra-ui/react';
import { RiBarChartBoxLine } from 'react-icons/ri';
import { FC, useState } from 'react';
import EditableText from './EditableText';
import BoardDetailsDrawer from './BoardDetailsDrawer';

const BoardDetailsHeader: FC = () => {
  const [editItemName, setEditItemName] = useState(false);

  const handleEditItemName = (isEditable: boolean) => {
    setEditItemName(isEditable);
  };
  return (
    <Box bg="purple.500" w="100%" px={5} py={9} display="flex" alignItems="center" justifyContent="space-between">
      <Button borderRadius="100" size="sm" leftIcon={<RiBarChartBoxLine />} colorScheme="teal" variant="solid">
        Boards
      </Button>
      <Box>
        <EditableText
          textSize="lg"
          textColor="white"
          editItemName={editItemName}
          handleEditItemName={handleEditItemName}
        />
      </Box>
      <BoardDetailsDrawer />
    </Box>
  );
};

export default BoardDetailsHeader;

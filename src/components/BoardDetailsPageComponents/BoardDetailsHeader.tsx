import { Box, Button } from '@chakra-ui/react';
import { RiBarChartBoxLine } from 'react-icons/ri';
import { FC, useState } from 'react';
import EditableText from './EditableText';
import BoardDetailsDrawer from './BoardDetailsDrawer';
import { useNavigate } from 'react-router-dom';

interface BoardDetailsHeaderProps {
  boardName: string;
  boardId: string;
}

const BoardDetailsHeader: FC<BoardDetailsHeaderProps> = ({ boardName, boardId }) => {
  const [editItemName, setEditItemName] = useState(false);
  const navigate = useNavigate();

  const handleEditItemName = (isEditable: boolean) => {
    setEditItemName(isEditable);
  };
  return (
    <Box bg="purple.500" w="100%" px={5} py={9} display="flex" alignItems="center" justifyContent="space-between">
      <Button
        borderRadius="100"
        size="sm"
        leftIcon={<RiBarChartBoxLine />}
        colorScheme="teal"
        variant="solid"
        onClick={() => navigate('/')}
      >
        Boards
      </Button>
      <Box>
        <EditableText
          textSize="lg"
          textColor="white"
          editItemName={editItemName}
          boardId={boardId}
          boardName={boardName}
          handleEditItemName={handleEditItemName}
        />
      </Box>
      <BoardDetailsDrawer />
    </Box>
  );
};

export default BoardDetailsHeader;

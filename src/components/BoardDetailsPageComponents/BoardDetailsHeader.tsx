import { Box, Button } from '@chakra-ui/react';
import { RiBarChartBoxLine } from 'react-icons/ri';
import { FC, useEffect, useState } from 'react';
import EditableText from './EditableText';
import BoardDetailsDrawer from './BoardDetailsDrawer';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchBoard } from '../../features/boardSlice';

interface BoardDetailsHeaderProps {
  boardName: string;
  boardId: string;
}

const BoardDetailsHeader: FC<BoardDetailsHeaderProps> = ({ boardName, boardId }) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBoard(id!));
  }, [dispatch, id]);

  const boardTitle = useAppSelector((state) => state.boardState.data?.title);

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

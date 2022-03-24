import { Box, Editable } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBoard } from '../../features/boardSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import Header from '../HomePageComponents/Header';
import BoardDetailsHeader from './BoardDetailsHeader';
import EditableAddButton from './EditableAddButton';
import ListBox from './ListBox';

const BoardDetails: FC = () => {
  const { id } = useParams();
  const board = useAppSelector((state) => state.boardState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBoard(id as string));
  }, [board, dispatch, id]);

  return (
    <Box>
      {id}
      <Header />
      <BoardDetailsHeader boardName={board.data?.title as string} boardId={id as string} />
      <Box
        p="4"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          overflowY: 'auto',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '20px',
        }}
      >
        {board.data?.lists.map((item) => {
          return <ListBox listId={item.id} listName={item.title} />;
        })}
        <EditableAddButton item="list" />
      </Box>
    </Box>
  );
};

export default BoardDetails;

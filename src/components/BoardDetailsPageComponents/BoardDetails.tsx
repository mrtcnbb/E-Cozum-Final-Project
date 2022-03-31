import { Box } from '@chakra-ui/react';
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
    dispatch(fetchBoard(id!));
  }, [dispatch, id]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <BoardDetailsHeader />
      <Box
        p="4"
        sx={{
          flex: '1',
          display: 'flex',
          flexDirection: 'row',
          overflowY: 'auto',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '20px',
        }}
      >
        {board.data?.lists.map((item) => {
          return <ListBox key={item.id} listId={item.id} listName={item.title} boardName={board.data?.title!} />;
        })}
        <EditableAddButton item="list" />
      </Box>
    </Box>
  );
};

export default BoardDetails;

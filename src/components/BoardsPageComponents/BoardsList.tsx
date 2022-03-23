import { Box } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import BoardCard from './BoardCard';
import { fetchBoards, resetState } from '../../features/boardsListSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import { useCookies } from 'react-cookie';

const BoardsList: FC = () => {
  const boardsList = useAppSelector((state) => state.boardsList);
  const dispatch = useAppDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'username']);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  return (
    <Box
      mx="70"
      py="20"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '30px',
      }}
    >
      {boardsList.data?.map((board: any) => {
        return <BoardCard key={board.id} addBoard={false} boardName={board.title} boardId={board.id} />;
      })}
      <BoardCard addBoard={true} />
    </Box>
  );
};

export default BoardsList;

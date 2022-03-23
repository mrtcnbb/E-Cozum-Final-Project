import { Box } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import BoardCard from './BoardCard';
import useCookie from '../../hooks/useCookie';
import { fetchBoards, resetState } from '../../features/boardsListSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const BoardsList: FC = () => {
  const [boards, setBoards] = useState<any>();
  const boardsList = useAppSelector((state) => state.boardsList);
  const dispatch = useAppDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'username']);
  // const { token } = useCookies(['token', 'username']);

  // const fetchBoards = async () => {
  //   axios
  //     .get(`${baseUrl}board`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log('boards :>> ', res.data);
  //       setBoards(res.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // useEffect(() => {
  //   fetchBoards().then((res) => {
  //     console.log('boards', res);
  //     setBoards(res);
  //   });
  // }, []);

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

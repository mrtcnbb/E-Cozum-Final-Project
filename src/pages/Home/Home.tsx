import { Box, Text } from '@chakra-ui/react';
import axios from 'axios';
import { FC, useEffect } from 'react';
import BoardsList from '../../components/BoardsPageComponents/BoardsList';
import Header from '../../components/HomePageComponents/Header';
import useCookie from '../../hooks/useCookie';
// import { baseUrl } from '../../service/baseUrl';

const Home: FC = () => {
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
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // useEffect(() => {
  //   fetchBoards();
  // }, []);

  return (
    <Box>
      <Header />
      <Box mt={40}>
        <Text textAlign="center" fontSize="40px" fontWeight="bold">
          Purpleboard App
        </Text>
      </Box>
      <BoardsList />
    </Box>
  );
};

export default Home;

import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';
import BoardsList from '../../components/BoardsPageComponents/BoardsList';
import Header from '../../components/HomePageComponents/Header';

const Home: FC = () => {
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

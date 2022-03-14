import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import BoardCard from './BoardCard';

const BoardsList: FC = () => {
  return (
    <Box
      mx="70"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '30px',
      }}
    >
      <BoardCard addBoard={true} />
      <BoardCard addBoard={false} boardName="ACME Frontend Applications" />
      <BoardCard addBoard={false} boardName="ACME Frontend Applications" />
    </Box>
  );
};

export default BoardsList;

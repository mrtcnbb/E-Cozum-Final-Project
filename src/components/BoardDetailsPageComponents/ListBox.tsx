import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import CardBox from './CardBox';
import EditableAddButton from './EditableAddButton';
import NameSettingsHolder from './NameSettingsHolder';

const ListBox: FC = () => {
  return (
    <Box bg="#F9F9F9" borderRadius="2xl" boxShadow="sm" width={320} m={100} border="1px" borderColor="rgb(230,230,230)">
      <Box pb="15px">
        <NameSettingsHolder subCompName="list" />
      </Box>
      <Box
        minHeight="30px"
        maxHeight="360px"
        overflowY="auto"
        sx={{
          '&::-webkit-scrollbar': {
            width: '5px',
            borderRadius: '8px',
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '8px',
            backgroundColor: `rgb(179,179,179)`,
          },
        }}
      >
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="16px" py="20px">
          <CardBox />
          <CardBox />
          <CardBox />
          <CardBox />
          <CardBox />
          <CardBox />
          <CardBox />
          <CardBox />
          <CardBox />
          <CardBox />
          <CardBox />
          <CardBox />
          <CardBox />
        </Box>
      </Box>
      <Box borderTop="1px" borderColor="rgb(230,230,230)">
        <EditableAddButton item="card" />
      </Box>
    </Box>
  );
};

export default ListBox;

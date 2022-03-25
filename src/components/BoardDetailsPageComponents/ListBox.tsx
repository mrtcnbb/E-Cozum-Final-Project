import { Box } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { Card } from '../../features/boardSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import CardBox from './CardBox';
import EditableAddButton from './EditableAddButton';
import NameSettingsHolder from './NameSettingsHolder';

interface ListBoxProps {
  listId: number;
  listName: string;
  cards?: Card[];
}

const ListBox: FC<ListBoxProps> = ({ listId, listName, cards }) => {
  const list = useAppSelector((state) => state.boardState.data?.lists.find((item) => item.id === listId));

  return (
    <Box bg="#F9F9F9" borderRadius="2xl" boxShadow="sm" width={320} border="1px" borderColor="rgb(230,230,230)">
      <Box pb="15px" width={320}>
        <NameSettingsHolder subCompName="list" listId={listId} listName={listName} />
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
          {list?.cards?.map((item) => {
            return <CardBox key={item.id} cardProp={item} cardId={item.id} listId={list.id} />;
          })}
        </Box>
      </Box>
      <Box borderTop="1px" borderColor="rgb(230,230,230)">
        <EditableAddButton item="card" listId={list?.id} />
      </Box>
    </Box>
  );
};

export default ListBox;

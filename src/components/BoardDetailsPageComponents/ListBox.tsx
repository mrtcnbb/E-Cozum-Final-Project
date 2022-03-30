import { Box } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { fetchBoard } from '../../features/boardSlice';
import authRequest from '../../service/authRequest';
import { useAppDispatch, useAppSelector } from '../../store';
import CardBox from './CardBoxComponents/CardBox';
import EditableAddButton from './EditableAddButton';
import NameSettingsHolder from './NameSettingsHolder';

interface ListBoxProps {
  listId: number;
  listName: string;
  boardName: string;
  index?: number;
  listOrder: number;
}

const ListBox: FC<ListBoxProps> = ({ listId, listName, boardName, index, listOrder }) => {
  const list = useAppSelector((state) => state.boardState.data?.lists.find((item) => item.id === listId));
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    authRequest()
      .put(`list/${listId}`, { order: index })
      .then(() => {
        dispatch(fetchBoard(id!));
      });
  }, [listId, dispatch, id, index]);

  return (
    <Draggable draggableId={list?.id.toString()!} index={index ? index : 0}>
      {(provided) => (
        <Box
          {...provided.draggableProps}
          ref={provided.innerRef}
          bg="rgb(245,245,245)"
          borderRadius="2xl"
          boxShadow="sm"
          width={320}
          border="1px"
          borderColor="rgb(230,230,230)"
        >
          <Box {...provided.dragHandleProps} pb="15px" width={320}>
            <NameSettingsHolder subCompName="list" listId={listId} listName={listName} />
          </Box>

          <Box
            maxHeight="360px"
            minHeight="30px"
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
            <Droppable droppableId={list?.id.toString()!} direction="vertical" type="task">
              {(provided) => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  gap="20px"
                  py="20px"
                >
                  {list?.cards?.map((item, index) => {
                    return (
                      <CardBox
                        index={index}
                        key={item.id}
                        cardId={item.id}
                        cardOrder={item.order!}
                        listId={list.id}
                        listName={list.title}
                        boardName={boardName}
                      />
                    );
                  })}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </Box>
          <Box borderTop="1px" borderColor="rgb(230,230,230)">
            <EditableAddButton item="card" listId={list?.id} />
          </Box>
        </Box>
      )}
    </Draggable>
  );
};

export default ListBox;

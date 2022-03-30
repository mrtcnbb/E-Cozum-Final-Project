import { Box } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { fetchBoard } from '../../features/boardSlice';
import authRequest from '../../service/authRequest';
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

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'task') {
      authRequest()
        .put(`card/${draggableId}`, {
          listId: Number(destination.droppableId),
        })
        .then(() => {
          dispatch(fetchBoard(id!));
          console.log('success');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <BoardDetailsHeader />
        <Box
          display={'flex'}
          flexDirection="row"
          gap="20px"
          justifyContent="flex-start"
          alignItems="flex-start"
          overflowY="auto"
          flex={'1'}
        >
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {(provided) => (
              <Box {...provided.droppableProps} ref={provided.innerRef}>
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
                  {board.data?.lists.map((item, index) => {
                    return (
                      <ListBox
                        index={index}
                        key={item.id}
                        listId={item.id}
                        listName={item.title}
                        boardName={board.data?.title!}
                        listOrder={item.order}
                      />
                    );
                  })}
                  {provided.placeholder}
                </Box>
              </Box>
            )}
          </Droppable>
          <Box mt="16px">
            <EditableAddButton item="list" />
          </Box>
        </Box>
      </Box>
    </DragDropContext>
  );
};

export default BoardDetails;

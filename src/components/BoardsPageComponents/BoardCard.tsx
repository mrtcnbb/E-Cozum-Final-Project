import { FC } from 'react';
import { Box, Text, Icon } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { RiBarChartBoxLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { createBoard } from '../../features/boardsListSlice';

interface BoardCardProps {
  addBoard: boolean;
  boardName?: string;
  boardId?: number;
}

const BoardCard: FC<BoardCardProps> = ({ addBoard, boardName, boardId }) => {
  const boardList = useAppSelector((state) => state.boardsList);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <Box
      as="button"
      border="1px"
      borderRadius="2xl"
      boxShadow="sm"
      _hover={{ boxShadow: 'lg' }}
      transition="0.5s"
      bg="white"
      borderColor="gray.200"
      width="192px"
      height="192px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      p="2"
      onClick={() => {
        if (addBoard) {
          dispatch(createBoard());
          const path = boardList.data && boardList.data[boardList.data.length - 1].id;
          navigate(`/board/${path}`);
        } else {
          navigate(`/board/${boardId}`);
        }
      }}
    >
      <Box
        sx={{ flex: '1' }}
        display="flex"
        flexDirection="column"
        width="174px"
        height="174px"
        justifyContent="space-evenly"
        alignItems="center"
      >
        {addBoard ? (
          <AddIcon boxSize="12" color="white" border="1px" borderRadius="full" bg="blue.200" p="2" />
        ) : (
          <Icon boxSize="12" as={RiBarChartBoxLine} />
        )}
        {addBoard ? (
          <Text textAlign="center" fontWeight="semibold">
            Add new board
          </Text>
        ) : (
          <Text textAlign="center" fontWeight="semibold">
            {boardName}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default BoardCard;

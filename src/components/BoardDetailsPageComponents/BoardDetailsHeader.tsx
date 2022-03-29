import { Box, Button, IconButton, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { RiBarChartBoxLine } from 'react-icons/ri';
import { FC, useEffect, useState } from 'react';
import BoardDetailsDrawer from './BoardDetailsDrawer';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchBoard } from '../../features/boardSlice';
import authRequest from '../../service/authRequest';
import { CheckIcon } from '@chakra-ui/icons';

const BoardDetailsHeader: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBoard(id!));
  }, [dispatch, id]);

  const boardTitle = useAppSelector((state) => state.boardState.data?.title);

  const [isEditable, setIsEditable] = useState<boolean>(true);

  const [boardsName, setBoardsName] = useState(boardTitle);

  const handleUpdateBoardTitle = () => {
    if (boardsName === '') {
      alert('Borad must have a name!');
    } else {
      authRequest()
        .put(`board/${id}`, { title: boardsName })
        .then(() => {
          dispatch(fetchBoard(id!));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (boardTitle) {
      setBoardsName(boardTitle);
    }
  }, [boardTitle]);

  return (
    <Box bg="purple.500" w="100%" px={5} py={9} display="flex" alignItems="center" justifyContent="space-between">
      <Button
        borderRadius="100"
        size="sm"
        leftIcon={<RiBarChartBoxLine />}
        colorScheme="teal"
        variant="solid"
        onClick={() => navigate('/')}
      >
        Boards
      </Button>
      {isEditable ? (
        <Box>
          <Text
            color={'white'}
            fontWeight="semibold"
            fontSize={'18px'}
            _hover={{ cursor: 'pointer' }}
            onClick={() => {
              setIsEditable(false);
              dispatch(fetchBoard(id!));
            }}
          >
            {boardTitle}
          </Text>
        </Box>
      ) : (
        <Box>
          <InputGroup>
            <Input
              value={boardsName}
              fontSize="md"
              color={'black'}
              bg="wheat"
              onChange={(event) => {
                setBoardsName(event.target.value);
              }}
            />
            <InputRightElement
              onClick={() => {
                handleUpdateBoardTitle();
                setIsEditable(true);
              }}
            >
              <IconButton
                isRound={true}
                size="sm"
                variant="none"
                color="gray.300"
                aria-label="edit name"
                _hover={{ color: 'gray.400', bg: 'gray.200' }}
                icon={<CheckIcon />}
              />
            </InputRightElement>
          </InputGroup>
        </Box>
      )}
      <BoardDetailsDrawer />
    </Box>
  );
};

export default BoardDetailsHeader;

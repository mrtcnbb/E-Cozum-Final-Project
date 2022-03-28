import { Box, Button, IconButton, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { RiBarChartBoxLine } from 'react-icons/ri';
import { FC, useEffect, useRef, useState } from 'react';
import EditableText from './EditableText';
import BoardDetailsDrawer from './BoardDetailsDrawer';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchBoard } from '../../features/boardSlice';
import authRequest from '../../service/authRequest';
import { CheckIcon } from '@chakra-ui/icons';

interface BoardDetailsHeaderProps {
  boardName: string;
  boardId: string;
}

interface UpdateBoardTitleProps {
  title: string;
}

const BoardDetailsHeader: FC<BoardDetailsHeaderProps> = ({ boardName, boardId }) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBoard(id!));
  }, [dispatch, id]);

  // const title = useRef<HTMLInputElement>(null);

  // title.current!.value = boardName;

  const boardTitle = useAppSelector((state) => state.boardState.data?.title);

  const [isEditable, setIsEditable] = useState<boolean>(true);

  const [updateBoardTitleObject, setUpdateBoardTitleObject] = useState<UpdateBoardTitleProps>({
    title: boardName,
  } as UpdateBoardTitleProps);

  const [boardsName, setBoardsName] = useState(boardTitle);

  const onBoardTitleChange = (event: any) => {
    setUpdateBoardTitleObject((prev) => ({ ...prev, title: event.target.value }));
  };

  const handleUpdateBoardTitle = () => {
    authRequest()
      .put(`board/${id}`, { title: boardsName })
      .then(() => {
        dispatch(fetchBoard(id!));
      })
      .catch((error) => {
        console.log(error);
      });
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
      {/* <Box>
        <EditableText
          textSize="lg"
          textColor="white"
          editItemName={editItemName}
          boardId={boardId}
          boardName={boardName}
          handleEditItemName={handleEditItemName}
        />
      </Box> */}
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
              //TODO: INPUT VALUE NE OLMALI
              value={boardsName}
              fontSize="md"
              color={'white'}
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

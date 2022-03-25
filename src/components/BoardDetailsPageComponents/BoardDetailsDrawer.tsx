import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
  Text,
  Input,
  Button,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import authRequest from '../../service/authRequest';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchBoard } from '../../features/boardSlice';

interface CreateMemberProps {
  username: string;
  boardId: number;
}

const BoardDetailsDrawer: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [createBoardMemberObject, setCreateBoardMemberObject] = useState<CreateMemberProps>({
    username: '',
    boardId: Number(id!),
  });

  const board = useAppSelector((state) => state.boardState);

  const deleteBoard = (id: string) => {
    authRequest()
      .delete(`board/${id}`)
      .then((res) => {
        navigate('/');
      });
  };

  const addMember = () => {
    authRequest()
      .post('board-member', createBoardMemberObject)
      .then((res) => {
        dispatch(fetchBoard(id!));
        console.log(createBoardMemberObject);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onMemberTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateBoardMemberObject((prev) => ({ ...prev, username: event.target.value }));
  };

  return (
    <>
      <IconButton
        variant="none"
        color="white"
        ml="10"
        aria-label="open settings"
        _focus={{ outline: '0' }}
        onClick={onOpen}
        icon={<SettingsIcon />}
      />
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader bg="purple.500" borderBottomWidth="1px" color="white" textAlign="center" fontSize="md">
            Settings
          </DrawerHeader>
          <DrawerBody>
            <Text _hover={{ cursor: 'pointer' }} onClick={() => deleteBoard(id!)}>
              Delete this board
            </Text>
            <Text>Add members to this board:</Text>
            <Input onChange={(event: React.ChangeEvent<HTMLInputElement>) => onMemberTextChange(event)} />
            <Button
              // disabled={createBoardMemberObject.username.trim() === ''}
              colorScheme="teal"
              size="sm"
              variant="solid"
              borderRadius="100"
              onClick={() => {
                addMember();
              }}
            >
              Add
            </Button>
            {board.data?.members.map((item) => {
              return <Text key={item.id}>{item.username}</Text>;
            })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default BoardDetailsDrawer;

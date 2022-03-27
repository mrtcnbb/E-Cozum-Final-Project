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
  Select,
  Box,
  Icon,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import authRequest from '../../service/authRequest';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchBoard } from '../../features/boardSlice';
import { fetchUsers } from '../../features/usersSlice';
import { BiPlus, BiTrashAlt, BiUser, BiUserPlus } from 'react-icons/bi';

interface CreateMemberProps {
  username: string;
  boardId: number;
}

const BoardDetailsDrawer: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [selectedUser, setSelectedUser] = useState<string>('');

  const [createBoardMemberObject, setCreateBoardMemberObject] = useState<CreateMemberProps>({
    username: selectedUser,
    boardId: Number(id!),
  });

  const [users, setUsers] = useState<any>();

  const board = useAppSelector((state) => state.boardState);

  useEffect(() => {
    dispatch(fetchUsers()).then((res) => {
      setUsers(res.payload);
    });
  }, [dispatch]);

  const deleteBoard = (id: string) => {
    authRequest()
      .delete(`board/${id}`)
      .then((res) => {
        navigate('/');
      });
  };

  const addMember = () => {
    authRequest()
      .post('board-member', {
        username: selectedUser,
        boardId: Number(id!),
      })
      .then((res) => {
        dispatch(fetchBoard(id!));
        console.log(createBoardMemberObject);
      })
      .catch((error) => {
        console.log(error);
      });
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
            <Box
              display={'flex'}
              _hover={{ cursor: 'pointer' }}
              justifyContent="space-between"
              alignItems="center"
              onClick={() => deleteBoard(id!)}
            >
              <Text>Delete this board</Text>
              <Box height={'18px'}>
                <Icon as={BiTrashAlt} color="gray" fontSize="lg" />
              </Box>
            </Box>
            <br />
            {users !== 0 && (
              <Box>
                <Box display={'flex'} justifyContent="space-between" alignItems="center">
                  <Text>Select members to add this board</Text>
                  <Box height={'18px'}>
                    <Icon as={BiPlus} color="gray" fontSize="lg" />
                  </Box>
                </Box>
                <Select
                  value={selectedUser}
                  icon={<Icon as={BiUser} color="gray" fontSize="lg" />}
                  onChange={(event) => {
                    setSelectedUser(event.target.value);
                  }}
                >
                  {users?.map((item: any) => {
                    return (
                      <option key={item.id} value={item.username}>
                        {item.username}
                      </option>
                    );
                  })}
                </Select>
              </Box>
            )}
            <br />
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

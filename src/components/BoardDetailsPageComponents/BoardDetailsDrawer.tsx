import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import authRequest from '../../service/authRequest';
import { useAppDispatch } from '../../store';
import { fetchBoards } from '../../features/boardsListSlice';

const BoardDetailsDrawer: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { id } = useParams();

  const disptach = useAppDispatch();

  const navigate = useNavigate();

  const deleteBoard = (id: string) => {
    authRequest()
      .delete(`board/${id}`)
      .then((res) => {
        disptach(fetchBoards());
        navigate('/');
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
            <Text _hover={{ cursor: 'pointer' }} onClick={() => deleteBoard(id!)}>
              Delete this board
            </Text>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default BoardDetailsDrawer;

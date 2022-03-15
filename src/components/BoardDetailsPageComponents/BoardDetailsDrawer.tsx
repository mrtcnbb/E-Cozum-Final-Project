import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { FC } from 'react';

const BoardDetailsDrawer: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        variant="none"
        color="white"
        ml="10"
        aria-label="open settings"
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
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default BoardDetailsDrawer;

import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, Icon, IconButton, MenuList, MenuItem } from '@chakra-ui/react';
import { RiMore2Line } from 'react-icons/ri';
import { FC } from 'react';

interface SubCompSettingsMenuProps {
  subCompName: string;
  handleEditListName: (isEditable: boolean) => void;
}

const SubCompSettingsMenu: FC<SubCompSettingsMenuProps> = ({ subCompName, handleEditListName }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        size="sm"
        variant="none"
        mt={3}
        icon={<Icon as={RiMore2Line} />}
      />
      <MenuList>
        <MenuItem icon={<DeleteIcon />}>Remove {subCompName}</MenuItem>
        <MenuItem onClick={() => handleEditListName(true)} icon={<EditIcon />}>
          Rename {subCompName}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SubCompSettingsMenu;

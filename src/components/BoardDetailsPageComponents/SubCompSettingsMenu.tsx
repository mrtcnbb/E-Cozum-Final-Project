import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, Icon, IconButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FC } from 'react';
import authRequest from '../../service/authRequest';
import { BiDotsVerticalRounded } from 'react-icons/bi';

interface SubCompSettingsMenuProps {
  subCompName: string;
  listId?: number;
  handleEditListName: (isEditable: boolean) => void;
}

const SubCompSettingsMenu: FC<SubCompSettingsMenuProps> = ({ subCompName, listId, handleEditListName }) => {
  const deleteList = (listId: number) => {
    authRequest()
      .delete(`list/${listId}`)
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        size="sm"
        variant="none"
        mt={3}
        _focus={{ outline: '0' }}
        icon={<Icon as={BiDotsVerticalRounded} />}
      />
      <MenuList>
        <MenuItem onClick={() => deleteList(listId!)} icon={<DeleteIcon />}>
          Remove {subCompName}
        </MenuItem>
        <MenuItem onClick={() => handleEditListName(true)} icon={<EditIcon />}>
          Rename {subCompName}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SubCompSettingsMenu;

import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, Icon, IconButton, MenuList, MenuItem } from '@chakra-ui/react';
import { RiMore2Line } from 'react-icons/ri';
import { FC } from 'react';
import authRequest from '../../service/authRequest';
import { useAppDispatch } from '../../store';
import { fetchBoards } from '../../features/boardsListSlice';

interface SubCompSettingsMenuProps {
  subCompName: string;
  listId?: number;
  handleEditListName: (isEditable: boolean) => void;
}

const SubCompSettingsMenu: FC<SubCompSettingsMenuProps> = ({ subCompName, listId, handleEditListName }) => {
  const disptach = useAppDispatch();

  const deleteList = (listId: number) => {
    authRequest()
      .delete(`list/${listId}`)
      .then((res) => {
        disptach(fetchBoards());
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
        icon={<Icon as={RiMore2Line} />}
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

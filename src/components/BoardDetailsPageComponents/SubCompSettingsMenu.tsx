import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, Icon, IconButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FC } from 'react';
import authRequest from '../../service/authRequest';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchBoard } from '../../features/boardSlice';
import { useParams } from 'react-router-dom';

interface SubCompSettingsMenuProps {
  subCompName: string;
  listId?: number;
  checklistId?: number;
  handleEditListName: (isEditable: boolean) => void;
}

const SubCompSettingsMenu: FC<SubCompSettingsMenuProps> = ({
  subCompName,
  listId,
  checklistId,
  handleEditListName,
}) => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const deleteList = (listId: number) => {
    authRequest()
      .delete(`list/${listId}`)
      .then(() => {
        dispatch(fetchBoard(id!));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteChecklist = (checklistId: number) => {
    authRequest()
      .delete(`checklist/${checklistId}`)
      .then(() => {
        dispatch(fetchBoard(id!));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        size="lg"
        variant="none"
        mt={3}
        _focus={{ outline: '0' }}
        icon={<Icon as={BiDotsVerticalRounded} />}
      />
      <MenuList>
        <MenuItem
          onClick={() => {
            if (subCompName === 'list') {
              deleteList(listId!);
            } else {
              deleteChecklist(checklistId!);
            }
          }}
          icon={<DeleteIcon />}
        >
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

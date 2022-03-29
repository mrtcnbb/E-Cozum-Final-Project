import { Box, Checkbox, IconButton, Input, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { BiTrashAlt } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import { fetchBoard } from '../../../features/boardSlice';
import authRequest from '../../../service/authRequest';
import { useAppDispatch } from '../../../store';
import { ChecklistItem } from '../../../type/type';

interface CardModalChecklistItemProps {
  checklistItem: ChecklistItem;
}

const CardModalChecklistItem: FC<CardModalChecklistItemProps> = ({ checklistItem }) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [isEditable, setIsEditable] = useState<boolean>(false);

  const [updateItemTitle, setUpdateItemTitle] = useState({
    title: checklistItem.title,
  });

  const handleItemTitleChange = () => {
    authRequest()
      .put(`checklist-item/${checklistItem.id}`, updateItemTitle)
      .then(() => {
        dispatch(fetchBoard(id!));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteItem = () => {
    authRequest()
      .delete(`checklist-item/${checklistItem.id}`)
      .then(() => {
        dispatch(fetchBoard(id!));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChecklistItemTitleChange = (event: any) => {
    setUpdateItemTitle((prev) => ({ ...prev, title: event.target.value }));
  };

  return (
    <Box pl="15px" display="flex" flexDirection="row" alignItems="center" gap="5px">
      <Checkbox
        isChecked={checklistItem.isChecked}
        onChange={() => {
          if (checklistItem.isChecked === true) {
            authRequest()
              .put(`checklist-item/${checklistItem.id}`, { isChecked: false })
              .then(() => {
                dispatch(fetchBoard(id!));
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            authRequest()
              .put(`checklist-item/${checklistItem.id}`, { isChecked: true })
              .then(() => {
                dispatch(fetchBoard(id!));
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }}
        colorScheme="teal"
        mr={'10px'}
      ></Checkbox>
      {!isEditable ? (
        <Box border={'1px'} borderColor="lightgray" p="15px" width={'full'} rounded={'md'}>
          <Text width={'full'} onClick={() => setIsEditable(true)}>
            {checklistItem.title}
          </Text>
        </Box>
      ) : (
        <Box width={'full'}>
          <Input
            value={updateItemTitle.title}
            height="54px"
            width="100%"
            fontSize="md"
            onChange={(event) => {
              onChecklistItemTitleChange(event);
            }}
            onKeyUp={() => {
              setTimeout(() => {
                handleItemTitleChange();
              }, 2.0 * 1000);
            }}
          />
        </Box>
      )}

      <IconButton
        onClick={() => handleDeleteItem()}
        size="lg"
        aria-label="Search database"
        bg="none"
        color="gray"
        rounded="full"
        icon={<BiTrashAlt />}
      />
    </Box>
  );
};

export default CardModalChecklistItem;

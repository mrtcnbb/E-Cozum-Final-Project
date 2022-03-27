import { Box, Icon, Input, Progress, Text, IconButton, Button, Checkbox } from '@chakra-ui/react';

import { BiCheckSquare } from 'react-icons/bi';
import { FC, useState } from 'react';
import NameSettingsHolder from './NameSettingsHolder';
import { Checklist } from '../../type/type';
import { AddIcon } from '@chakra-ui/icons';
import authRequest from '../../service/authRequest';
import { useAppDispatch } from '../../store';
import { useParams } from 'react-router-dom';
import { fetchBoard } from '../../features/boardSlice';
import ModalChecklistItem from './ModalChecklistItem';

interface CardModalChecklistProps {
  checklist?: Checklist;
}

interface AddChecklistItemObjectProps {
  checklistId: number;
  title: string;
  isChecked: boolean;
}

const CardModalChecklist: FC<CardModalChecklistProps> = ({ checklist }) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [addChecklistItemObject, setAddChecklistItemObject] = useState<AddChecklistItemObjectProps>({
    checklistId: checklist?.id!,
    title: '',
    isChecked: false,
  });

  const onChecklistItemTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddChecklistItemObject((prev) => ({ ...prev, title: event.target.value }));
  };

  const addChecklistItem = () => {
    authRequest()
      .post(`checklist-item`, addChecklistItemObject)
      .then(() => {
        dispatch(fetchBoard(id!));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const totalIsCheckedItem = () => {
    let total = 0;
    checklist?.items.forEach((item) => {
      if (item.isChecked === true) {
        total += 1;
      }
    });
    return total;
  };

  return (
    <Box display={'flex'} flexDirection="column" mb="20px" gap="15px">
      <Box id="CHECKLIST HEADER" display="flex" flexDirection="row" alignItems="start" gap="10px">
        <Icon boxSize={5} mt="11px" as={BiCheckSquare} />
        <NameSettingsHolder subCompName="Checklist" checklistId={checklist?.id} checklistName={checklist?.title} />
      </Box>
      <Box>
        <Text>
          {totalIsCheckedItem()}/{checklist?.items.length}
        </Text>
      </Box>
      <Progress
        value={
          totalIsCheckedItem() === 0 && checklist?.items.length === 0
            ? 0
            : (totalIsCheckedItem() / checklist?.items.length!) * 100
        }
        size="xs"
        colorScheme="teal"
        bg="teal.100"
      />
      {checklist?.items.map((item) => {
        return <ModalChecklistItem key={item.id} checklistItem={item} />;
      })}
      <Box id="ITEM ADD INPUT" display={'flex'} flexDirection="row" alignItems={'center'} gap="10px" pl="45px">
        <Input
          placeholder="Add an item"
          size={'lg'}
          fontSize="sm"
          value={addChecklistItemObject.title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChecklistItemTitleChange(event)}
        />
        <IconButton
          size={'md'}
          disabled={addChecklistItemObject.title.trim() === ''}
          aria-label="add item"
          border={'none'}
          rounded={'full'}
          colorScheme="teal"
          onClick={() => {
            addChecklistItem();
            setAddChecklistItemObject((prev) => ({ ...prev, title: '' }));
          }}
          icon={<AddIcon />}
        />
      </Box>
    </Box>
  );
};

export default CardModalChecklist;

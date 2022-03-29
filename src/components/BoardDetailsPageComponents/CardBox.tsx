import { Box, Text, Icon } from '@chakra-ui/react';
import { BiCommentDetail, BiFile } from 'react-icons/bi';
import MiniLabel from './MiniLabel';
import CardCheckTag from './CardCheckTag';
import { FC, useState } from 'react';
import { useAppSelector } from '../../store';
import CardModal from './CardModal';
import React from 'react';
import CardDateTag from './CardDateTag';

interface CardBoxProps {
  cardId: number;
  listId: number;
  listName: string;
  boardName: string;
  ref?: any;
}

const CardBox: FC<CardBoxProps> = ({ cardId, listId, listName, boardName }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onClose = () => {
    setIsModalOpen(!isModalOpen);
  };

  const divRef = React.useRef<HTMLDivElement>(null);

  const card = useAppSelector((state) =>
    state.boardState.data?.lists
      .find((listItem) => listItem.id === listId)
      ?.cards.find((cardItem) => cardItem.id === cardId)
  );

  const calculateTotalChecks = () => {
    let totalChecks = 0;
    card?.checklists.forEach((item) => {
      totalChecks += item.items.length;
    });
    return totalChecks;
  };

  const calculateTotalCheckeds = () => {
    let totalCheckeds = 0;
    card?.checklists.forEach((Item) => {
      Item.items.forEach((itemC) => {
        if (itemC.isChecked === true) {
          totalCheckeds += 1;
        }
      });
    });
    return totalCheckeds;
  };

  return (
    <Box
      bg="rgb(250,250,250)"
      _hover={{ cursor: 'pointer' }}
      onClick={onOpen}
      ref={divRef}
      borderRadius="2xl"
      boxShadow="sm"
      width={286}
      border="1px"
      borderColor="rgb(230,230,230)"
    >
      <Box p="15px">
        <Box display="flex" gap={2}>
          {card?.labels.map((item) => {
            return <MiniLabel labelId={item.id} key={item.id} />;
          })}
        </Box>
        <Text my="18px">{card?.title}</Text>
        <Box display="flex" justifyContent="start" gap="5px">
          {card?.duedate && card?.duedate !== '2010-01-01' && <CardDateTag dueDate={card?.duedate} />}
          {card?.checklists.length !== 0 && (
            <CardCheckTag totalCheckeds={() => calculateTotalCheckeds()} totalChecks={() => calculateTotalChecks()} />
          )}
        </Box>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="47px"
        p="18px"
        borderTop="1px"
        borderColor="rgb(230,230,230)"
      >
        <Box>{card?.description && <Icon boxSize={4} as={BiFile} />}</Box>
        {card?.comments.length !== 0 && (
          <Box display="flex" justifyContent="space-between" alignItems="center" width="30px">
            <Icon boxSize={4} mt="2px" as={BiCommentDetail} />
            <Text fontSize="xs" display="inline-block" lineHeight="0">
              {card?.comments.length}
            </Text>
          </Box>
        )}
      </Box>
      <CardModal card={card!} openModal={isModalOpen} handleClose={onClose} listName={listName} boardName={boardName} />
    </Box>
  );
};

export default CardBox;

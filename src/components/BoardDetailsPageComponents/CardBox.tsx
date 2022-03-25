import { Box, Text, Icon, Button } from '@chakra-ui/react';
import { BiCommentDetail, BiFile } from 'react-icons/bi';
import MiniLabel from './MiniLabel';
import CardTag from './CardTag';
import { FC, useEffect, useState } from 'react';
import { Card } from '../../features/boardSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import CardModal from './CardModal';
import React from 'react';

interface CardBoxProps {
  cardProp: Card;
  cardId: number;
  listId: number;
  listName: string;
  boardName: string;
}

const CardBox: FC<CardBoxProps> = ({ cardProp, cardId, listId, listName, boardName }) => {
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

  const labels = ['red', 'blue', 'orange', 'green'];
  return (
    <Box
      bg="#F9F9F9"
      _hover={{ cursor: 'pointer' }}
      onClick={onOpen}
      ref={divRef}
      borderRadius="2xl"
      boxShadow="sm"
      width={286}
      m={5}
      border="1px"
      borderColor="rgb(230,230,230)"
    >
      <Box p="15px">
        <Box display="flex" gap={2}>
          {labels.map((item: string) => {
            return <MiniLabel labelColor={item} key={item} />;
          })}
        </Box>
        <Text my="18px">{card?.title}</Text>
        <Box display="flex" justifyContent="start" gap="5px">
          <CardTag tagType="dueDate" test="test" />
          <CardTag tagType="checkRatio" test="test" />
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
        <Box display="flex" justifyContent="space-between" alignItems="center" width="30px">
          <Icon boxSize={4} mt="2px" as={BiCommentDetail} />
          <Text fontSize="xs" display="inline-block" lineHeight="0">
            2
          </Text>
        </Box>
      </Box>
      <CardModal card={card!} openModal={isModalOpen} handleClose={onClose} listName={listName} boardName={boardName} />
    </Box>
  );
};

export default CardBox;

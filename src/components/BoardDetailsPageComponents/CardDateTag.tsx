import { Tag, TagLeftIcon, TagLabel } from '@chakra-ui/react';
import { format } from 'date-fns/esm';
import React, { FC } from 'react';
import { BiTimeFive } from 'react-icons/bi';

interface CardCheckTagProps {
  dueDate: string;
}

const CardDateTag: FC<CardCheckTagProps> = ({ dueDate }) => {
  const cardDuedate = new Date(dueDate!);
  const formatDate = new Date();
  const initialDate = new Date(format(formatDate, 'yyyy-MM-dd'));

  return (
    <Tag size={'md'} rounded="full" variant="subtle" colorScheme={cardDuedate > initialDate ? 'teal' : 'red'}>
      <TagLeftIcon boxSize="18px" as={BiTimeFive} />
      <TagLabel lineHeight="taller">{dueDate}</TagLabel>
    </Tag>
  );
};

export default CardDateTag;

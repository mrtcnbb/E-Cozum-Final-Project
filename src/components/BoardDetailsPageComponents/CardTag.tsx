import { Tag, TagLeftIcon, TagLabel } from '@chakra-ui/react';
import React, { FC } from 'react';
import { BiTimeFive, BiCheckCircle } from 'react-icons/bi';

interface CardTagProps {
  tagType: 'dueDate' | 'checkRatio';
  test: 'test';
}

const CardTag: FC<CardTagProps> = ({ tagType, test }) => {
  return (
    <Tag
      size={'md'}
      rounded="full"
      variant="subtle"
      colorScheme={tagType === 'dueDate' && test === 'test' ? 'teal' : 'blackAlpha'}
    >
      <TagLeftIcon boxSize="18px" as={tagType === 'dueDate' ? BiTimeFive : BiCheckCircle} />
      <TagLabel>Test Tag</TagLabel>
    </Tag>
  );
};

export default CardTag;

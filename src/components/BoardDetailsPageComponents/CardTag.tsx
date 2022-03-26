import { Tag, TagLeftIcon, TagLabel } from '@chakra-ui/react';
import React, { FC } from 'react';
import { BiTimeFive, BiCheckCircle } from 'react-icons/bi';

interface CardTagProps {
  tagType: 'dueDate' | 'checkRatio';
  totalChecks?: () => number;
  totalCheckeds?: () => number;
}

const CardTag: FC<CardTagProps> = ({ tagType, totalChecks, totalCheckeds }) => {
  return (
    <Tag
      size={'md'}
      rounded="full"
      variant="subtle"
      colorScheme={tagType === 'checkRatio' && totalCheckeds!() / totalChecks!() === 1 ? 'teal' : 'blackAlpha'}
    >
      <TagLeftIcon boxSize="18px" as={tagType === 'dueDate' ? BiTimeFive : BiCheckCircle} />
      <TagLabel lineHeight="taller">{tagType === 'checkRatio' ? `${totalCheckeds!()}/${totalChecks!()}` : ''}</TagLabel>
    </Tag>
  );
};

export default CardTag;

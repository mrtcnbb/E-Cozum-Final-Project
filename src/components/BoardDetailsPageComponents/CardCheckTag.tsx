import { Tag, TagLeftIcon, TagLabel } from '@chakra-ui/react';
import { format } from 'date-fns/esm';
import React, { FC } from 'react';
import { BiCheckCircle } from 'react-icons/bi';

interface CardCheckTagProps {
  totalChecks: () => number;
  totalCheckeds: () => number;
}

const CardCheckTag: FC<CardCheckTagProps> = ({ totalChecks, totalCheckeds }) => {
  return (
    <Tag
      size={'md'}
      rounded="full"
      variant="subtle"
      colorScheme={totalCheckeds!() / totalChecks!() === 1 ? 'teal' : 'blackAlpha'}
    >
      <TagLeftIcon boxSize="18px" as={BiCheckCircle} />
      <TagLabel lineHeight="taller">{`${totalCheckeds!()}/${totalChecks!()}`}</TagLabel>
    </Tag>
  );
};

export default CardCheckTag;

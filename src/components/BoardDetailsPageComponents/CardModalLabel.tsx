import { Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';
import React, { FC } from 'react';

interface CardModalLabelProps {
  labelName: string;
}

const CardModalLabel: FC<CardModalLabelProps> = ({ labelName }) => {
  return (
    <Tag
      size="lg"
      borderRadius="full"
      variant="solid"
      colorScheme={
        labelName === 'High Priority'
          ? 'red'
          : labelName === 'Feature'
          ? 'green'
          : labelName === 'App'
          ? 'blue'
          : 'orange'
      }
    >
      <TagLabel fontWeight="normal" fontSize="small" lineHeight="taller">
        {labelName}
      </TagLabel>
      <TagCloseButton />
    </Tag>
  );
};

export default CardModalLabel;

import { Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';
import { FC } from 'react';

interface CardModalLabelProps {
  labelId: number;
  deleteLabel: (labelId: number) => void;
}

const CardModalLabel: FC<CardModalLabelProps> = ({ labelId, deleteLabel }) => {
  return (
    <Tag size="lg" borderRadius="full" variant="solid" colorScheme={labelId === 1 ? 'red' : 'gray'}>
      <TagLabel fontWeight="normal" fontSize="small" lineHeight="taller">
        {labelId === 1 ? 'High-Priority' : 'Low-Priority'}
      </TagLabel>
      <TagCloseButton onClick={() => deleteLabel(labelId)} />
    </Tag>
  );
};

export default CardModalLabel;

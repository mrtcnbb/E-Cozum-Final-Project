import { Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';
import { FC } from 'react';
import useCardToast from '../../../hooks/useCardToast';

interface CardModalLabelProps {
  labelId: number;
  deleteLabel: (labelId: number) => void;
}

const CardModalLabel: FC<CardModalLabelProps> = ({ labelId, deleteLabel }) => {
  const { showToast } = useCardToast();

  return (
    <Tag size="lg" borderRadius="full" variant="solid" colorScheme={labelId === 1 ? 'red' : 'gray'}>
      <TagLabel fontWeight="normal" fontSize="small" lineHeight="taller">
        {labelId === 1 ? 'High-Priority' : 'Low-Priority'}
      </TagLabel>
      <TagCloseButton
        onClick={() => {
          deleteLabel(labelId);
          showToast();
        }}
      />
    </Tag>
  );
};

export default CardModalLabel;

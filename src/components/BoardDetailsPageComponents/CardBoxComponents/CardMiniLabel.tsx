import { Box, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';

interface CardMiniLabelProps {
  labelId: number;
}

const CardMiniLabel: FC<CardMiniLabelProps> = ({ labelId }) => {
  return (
    <Tooltip label={labelId === 1 ? 'High-Priority' : 'Low-Priority'} aria-label="A tooltip" rounded="lg">
      <Box display="inline-block" height="6px" width="32px" rounded="full" bg={labelId === 1 ? 'red' : 'gray'}></Box>
    </Tooltip>
  );
};

export default CardMiniLabel;

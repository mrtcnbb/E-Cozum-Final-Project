import { Box, Tooltip } from '@chakra-ui/react';
import React, { FC } from 'react';

interface MiniLabelProps {
  labelId: number;
}

const MiniLabel: FC<MiniLabelProps> = ({ labelId }) => {
  return (
    <Tooltip label={labelId === 1 ? 'Önemli' : 'Önemsiz'} aria-label="A tooltip" rounded="lg">
      <Box display="inline-block" height="6px" width="32px" rounded="full" bg={labelId === 1 ? 'red' : 'gray'}></Box>
    </Tooltip>
  );
};

export default MiniLabel;

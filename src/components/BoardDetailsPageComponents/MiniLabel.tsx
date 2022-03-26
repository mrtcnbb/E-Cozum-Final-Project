import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';

interface MiniLabelProps {
  labelId: number;
}

const MiniLabel: FC<MiniLabelProps> = ({ labelId }) => {
  return (
    <Box display="inline-block" height="6px" width="32px" rounded="full" bg={labelId === 1 ? 'red' : 'gray'}></Box>
  );
};

export default MiniLabel;

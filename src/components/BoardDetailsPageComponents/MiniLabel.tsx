import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';

interface MiniLabelProps {
  labelColor?: string;
}

const MiniLabel: FC<MiniLabelProps> = ({ labelColor }) => {
  return (
    <Box
      display="inline-block"
      height="6px"
      width="32px"
      rounded="full"
      bg={labelColor === 'red' ? 'red' : labelColor === 'blue' ? 'blue' : labelColor === 'orange' ? 'orange' : 'green'}
    ></Box>
  );
};

export default MiniLabel;

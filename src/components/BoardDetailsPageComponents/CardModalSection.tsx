import { Box, Icon, Text } from '@chakra-ui/react';
import { BiCommentDetail, BiLabel, BiListUl } from 'react-icons/bi';
import React, { FC } from 'react';

interface CardModalSectionProps {
  iconType: 'BiListUl' | 'BiLabel' | 'BiCommentDetail';
  sectionName: 'Activity' | 'Comment' | 'Labels';
}

const CardModalSection: FC<CardModalSectionProps> = ({ iconType, sectionName }) => {
  return (
    <Box display="flex" flexDirection="row" alignItems="start" gap="10px">
      <Icon
        boxSize={5}
        mt="5px"
        as={iconType === 'BiCommentDetail' ? BiCommentDetail : iconType === 'BiLabel' ? BiLabel : BiListUl}
      />
      <Text fontSize="large" fontWeight="semibold">
        {sectionName}
      </Text>
    </Box>
  );
};

export default CardModalSection;

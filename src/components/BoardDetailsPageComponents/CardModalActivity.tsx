import { Avatar, Box, Text } from '@chakra-ui/react';
import React, { FC } from 'react';

interface CardModalActivityProps {
  authorName: string;
  message: string;
}

const CardModalActivity: FC<CardModalActivityProps> = ({ authorName, message }) => {
  return (
    <Box
      display={'flex'}
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center"
      gap="15px"
      borderLeftRadius="lg"
      borderRightRadius="2xl"
    >
      <Box>
        <Avatar bg="purple.500" color="white" name={authorName} size="sm" />
      </Box>
      <Box border="1px" borderColor="lightgray" p="12px" borderLeftRadius="lg" borderRightRadius="2xl">
        <Text fontSize="13px" fontWeight="semibold">
          {authorName}
        </Text>
        <Text fontSize="13px">{message}</Text>
      </Box>
    </Box>
  );
};

export default CardModalActivity;

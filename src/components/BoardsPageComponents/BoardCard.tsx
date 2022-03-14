import { FC } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import MembersListPopver from './MembersListPopver';
import UserAvatars from './UserAvatars';

const BoardCard: FC = () => {
  return (
    <Box
      border="1px"
      borderRadius="2xl"
      boxShadow="sm"
      _hover={{ boxShadow: 'lg' }}
      transition="0.5s"
      bg="white"
      borderColor="gray.200"
      width="192px"
      height="192px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      p="2"
      m="40"
    >
      <Box sx={{ flex: '1' }} display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
        <AddIcon
          boxSize="12"
          color="white"
          border="1px"
          borderRadius="full"
          bg="blue.200"
          p="2"
          onClick={() => alert('list')}
        />
        <Text textAlign="center" fontWeight="semibold">
          Add new board
        </Text>
      </Box>
      <Box>
        <UserAvatars />
      </Box>
    </Box>
  );
};

export default BoardCard;

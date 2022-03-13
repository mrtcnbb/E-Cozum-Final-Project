import { LockIcon } from '@chakra-ui/icons';
import { Flex, Box, Avatar, Text, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FC } from 'react';

const Header: FC = () => {
  return (
    <Box bg="white" w="100%" p={2} display="flex" alignItems="center" justifyContent="flex-end" boxShadow="md">
      <Menu>
        <MenuButton px={3} py={1} _hover={{ background: '#F6F6F7' }} alignItems="center" borderRadius="3xl">
          <Flex alignItems="center">
            <Box mr="3" textAlign="end">
              <Text fontWeight="bold" fontSize={13}>
                Muratcan Baba
              </Text>
              <Text fontSize={11}>Guest</Text>
            </Box>
            <Avatar bg="purple.500" color="white" name="Muratcan Baba" size="sm" />
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem
            icon={<LockIcon />}
            onClick={() => {
              console.log('heeeeyyy');
            }}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Header;

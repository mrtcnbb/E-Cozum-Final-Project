import { LockIcon } from '@chakra-ui/icons';
import { Flex, Box, Avatar, Text, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FC } from 'react';
import useCookie from '../../hooks/useCookie';
import { useAppDispatch } from '../../store';
import { setIsLogged } from '../../features/authSlice';
import { useCookies } from 'react-cookie';
import { resetState } from '../../features/boardsListSlice';

const Header: FC = () => {
  // const { username, deleteCookie } = useCookies(['token', 'username']);
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'username']);
  const dispatch = useAppDispatch();

  return (
    <Box
      bg="white"
      w="100%"
      p={2}
      position="sticky"
      zIndex="20"
      top="0"
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      boxShadow="md"
    >
      <Menu>
        <MenuButton px={3} py={1} _hover={{ background: '#F6F6F7' }} alignItems="center" borderRadius="3xl">
          <Flex alignItems="center">
            <Box mr="3" textAlign="end">
              <Text fontWeight="bold" fontSize={13}>
                {cookies.username}
              </Text>
              <Text fontSize={11}>Guest</Text>
            </Box>
            <Avatar bg="purple.500" color="white" name={cookies.username} size="sm" />
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => {
              removeCookie('token');
              removeCookie('username');
              dispatch(resetState());
              // document.cookie = '';

              dispatch(setIsLogged(false));
            }}
            icon={<LockIcon />}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Header;

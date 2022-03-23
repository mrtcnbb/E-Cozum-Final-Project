import { UnlockIcon } from '@chakra-ui/icons';
import { Box, Button, Center, VStack } from '@chakra-ui/react';
import React, { FC } from 'react';
import useHandleFormData from '../../hooks/useHandleFormData';
import FormInput from './FormInput';
import { setIsLogged } from '../../features/authSlice';
import { useAppDispatch } from '../../store';
import { useCookies } from 'react-cookie';
import authRequest from '../../service/authRequest';

const LoginForm: FC = () => {
  const { formData, handleFormData } = useHandleFormData();
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'username']);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    authRequest()
      .post(`auth/login`, formData)
      .then((response) => {
        setCookie('token', response.data.token, { path: '/' });
        setCookie('username', response.data.username, { path: '/' });
        dispatch(setIsLogged(true));
        console.log(response.data.username);
      })
      .catch((err) => {
        alert('Hatalı kullanıcı adı ya da parola girişi!');
        console.log(err.message);
      });
  };

  return (
    <Center>
      <Box
        border="1px"
        borderColor="gray.200"
        p={5}
        borderRadius="10px"
        boxShadow="lg"
        mt="24"
        bg="white"
        _hover={{ cursor: 'pointer' }}
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={5}>
            <UnlockIcon color="green.500" boxSize="10" />
            <FormInput
              inputLabelText="Username"
              propsText="username"
              placeholder="username"
              onChange={handleFormData}
            />
            <FormInput
              inputLabelText="Password"
              propsText="password"
              placeholder="password"
              type="password"
              onChange={handleFormData}
            />
            <Button type="submit" color="purple.500">
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  );
};

export default LoginForm;

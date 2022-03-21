import { UnlockIcon } from '@chakra-ui/icons';
import { Box, Button, Center, VStack } from '@chakra-ui/react';
import React, { FC } from 'react';
import useCookie from '../../hooks/useCookie';
import axios from 'axios';
import useHandleFormData from '../../hooks/useHandleFormData';
import FormInput from './FormInput';

interface LoginFormProps {
  handleIsLogged: (logged: boolean) => void;
}

const LoginForm: FC<LoginFormProps> = ({ handleIsLogged }) => {
  const { formData, handleFormData } = useHandleFormData();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post(`http://localhost:80/auth/login`, formData)
      .then((response) => {
        document.cookie = `token=${response.data.token}`;
        handleIsLogged(true);
      })
      .catch((err) => console.log(err.message));
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

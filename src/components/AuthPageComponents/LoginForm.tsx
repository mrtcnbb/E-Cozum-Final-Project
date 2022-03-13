import { UnlockIcon } from '@chakra-ui/icons';
import { Box, Button, Center, VStack } from '@chakra-ui/react';
import React, { FC } from 'react';
import useHandleFormData from '../../hooks/useHandleFormData';
import FormInput from './FormInput';

const LoginForm: FC = () => {
  const { formData, handleFormData } = useHandleFormData();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Center>
      <Box
        border="1px"
        borderColor="gray.200"
        p={5}
        borderRadius="10px"
        boxShadow="lg"
        my="36"
        bg="white"
        _hover={{ cursor: 'pointer' }}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
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

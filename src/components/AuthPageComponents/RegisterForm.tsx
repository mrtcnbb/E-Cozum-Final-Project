import { Box, Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Center } from '@chakra-ui/react';

import { FC, useState } from 'react';
import useHandleFormData from '../../hooks/useHandleFormData';

const RegisterForm: FC = () => {
  const { formData, handleFormData } = useHandleFormData();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Center>
      <Box border="1px" borderColor="gray.200" p={5} borderRadius="10px" boxShadow="lg" my="36" bg="white">
        <form onSubmit={(e) => handleSubmit(e)}>
          <VStack spacing={5}>
            <CheckCircleIcon color="blue.500" boxSize="10" />
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input id="username" name="username" placeholder="username" onChange={handleFormData} required />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="password"
                required
                onChange={handleFormData}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
              <Input
                id="confirm-password"
                type="password"
                name="passwordConfirm"
                placeholder="confirm password"
                required
                onChange={handleFormData}
              />
            </FormControl>
            <Button type="submit" color="purple.500">
              Register
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  );
};

export default RegisterForm;

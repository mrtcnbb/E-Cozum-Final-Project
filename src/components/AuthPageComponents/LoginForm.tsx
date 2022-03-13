import { UnlockIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Input, VStack } from '@chakra-ui/react';
import React, { FC, useState } from 'react';

const LoginForm: FC = () => {
  const [loginFormData, setLoginFormData] = useState<object>({});

  const handleLoginFieldChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('it works');
  };

  return (
    <Center>
      <Box
        border="1px"
        borderColor="gray.200"
        p={5}
        borderRadius="10px"
        boxShadow="lg"
        my="40"
        bg="white"
        _hover={{ cursor: 'pointer' }}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <VStack spacing={5}>
            <UnlockIcon color="green.500" boxSize="10" />
            <Input name="username" placeholder="username" />
            <Input type="password" placeholder="password" />
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

import { Box, Button, Input, VStack } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Center } from '@chakra-ui/react';

import { FC, useState } from 'react';

const RegisterForm: FC = () => {
  const [registerFormData, setRegisterFormData] = useState<object>({});

  const handleRegisterFieldChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setRegisterFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('it works');
  };

  return (
    <Center>
      <Box border="1px" borderColor="gray.200" p={5} borderRadius="10px" boxShadow="lg" my="40" bg="white">
        <form onSubmit={(e) => handleSubmit(e)}>
          <VStack spacing={5}>
            <CheckCircleIcon color="blue.500" boxSize="10" />
            <Input name="username" placeholder="username" />
            <Input type="password" placeholder="password" />
            <Input type="password" placeholder="confirm password" />
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

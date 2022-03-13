import { Box, Button, VStack } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Center } from '@chakra-ui/react';

import { FC } from 'react';
import useHandleFormData from '../../hooks/useHandleFormData';
import FormInput from './FormInput';

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
            <FormInput
              inputLabelText="Confirm Password"
              propsText="passwordConfirm"
              placeholder="confirm password"
              type="password"
              onChange={handleFormData}
            />
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

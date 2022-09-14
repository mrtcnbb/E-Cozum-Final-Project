import { Box, Button, VStack } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Center } from '@chakra-ui/react';
import { setIsLogged } from '../../features/authSlice';
import { FC } from 'react';
import useHandleFormData from '../../hooks/useHandleFormData';
import FormInput from './FormInput';
import authRequest from '../../service/authRequest';
import { useCookies } from 'react-cookie';
import { useAppDispatch } from '../../store';

const RegisterForm: FC = () => {
  const { formData, handleFormData } = useHandleFormData();
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'username']);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    authRequest()
      .post(`auth/register`, formData)
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
      <Box width={'md'} border="1px" borderColor="gray.200" p={5} borderRadius="10px" boxShadow="lg" mt="24" bg="white">
        <form onSubmit={(e) => handleSubmit(e)}>
          <VStack spacing={5}>
            <CheckCircleIcon color="blue.500" boxSize="10" />
            <FormInput
              inputLabelText="Username"
              propsText="username"
              placeholder="username"
              onChange={handleFormData}
              id="usernameReg"
            />
            <FormInput
              inputLabelText="Password"
              propsText="password"
              placeholder="password"
              type="password"
              onChange={handleFormData}
              id="passwordReg1"
            />
            <FormInput
              inputLabelText="Confirm Password"
              propsText="passwordConfirm"
              placeholder="confirm password"
              type="password"
              onChange={handleFormData}
              id="passwordReg2"
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

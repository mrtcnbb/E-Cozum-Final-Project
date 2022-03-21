import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { FC } from 'react';
import LoginForm from '../../components/AuthPageComponents/LoginForm';
import RegisterForm from '../../components/AuthPageComponents/RegisterForm';

interface AuthProps {
  handleIsLogged: (logged: boolean) => void;
}

const Auth: FC<AuthProps> = ({ handleIsLogged }) => {
  return (
    <Tabs isFitted variant="enclosed" colorScheme="purple">
      <TabList mb="1em" bg="white">
        <Tab _selected={{ color: 'white', bg: 'purple.500' }}>REGISTER</Tab>
        <Tab _selected={{ color: 'white', bg: 'purple.500' }}>LOGIN</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <RegisterForm />
        </TabPanel>
        <TabPanel>
          <LoginForm handleIsLogged={handleIsLogged} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Auth;

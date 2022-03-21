import './App.css';
import useCookie from './hooks/useCookie';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Auth from './pages/auth/Auth';
import Home from './pages/Home/Home';
import { useEffect, useState } from 'react';

function App() {
  const { token } = useCookie();
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const handleIsLogged = (logged: boolean) => {
    setIsLogged(logged);
  };

  useEffect(() => {
    if (token) {
      console.log('rendered?');

      setIsLogged(true);
    }
  }, [isLogged, token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLogged ? <Home /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={!isLogged ? <Auth handleIsLogged={handleIsLogged} /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import './App.css';
import useCookie from './hooks/useCookie';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Auth from './pages/auth/Auth';
import Home from './pages/Home/Home';
import { useEffect } from 'react';
import { setIsLogged } from './features/authSlice';
import { useAppDispatch, useAppSelector } from './store';

function App() {
  const { token } = useCookie();
  const authState = useAppSelector((state) => state.authState);

  const { isLogged } = authState;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      console.log('rendered?');
      dispatch(setIsLogged(true));
    }
  }, [isLogged, token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLogged ? <Home /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={!isLogged ? <Auth /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

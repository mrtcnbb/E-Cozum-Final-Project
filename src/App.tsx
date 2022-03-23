import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Auth from './pages/auth/Auth';
import Home from './pages/home/Home';
import { useEffect } from 'react';
import { setIsLogged } from './features/authSlice';
import { useAppDispatch, useAppSelector } from './store';
import BoardDetails from './components/BoardDetailsPageComponents/BoardDetails';
import { useCookies } from 'react-cookie';
import { CookiesProvider } from 'react-cookie';

function App() {
  // const { token } = useCookies(['token', 'username']);
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'username']);
  const authState = useAppSelector((state) => state.authState);

  const { isLogged } = authState;
  console.log('isLogged :>> ', isLogged);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cookies.token) {
      dispatch(setIsLogged(true));
    }
  }, []);

  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLogged ? <Home /> : <Navigate to="/auth" />} />
          <Route path="/auth" element={!isLogged ? <Auth /> : <Navigate to="/" />} />
          <Route path="/board/:id" element={isLogged ? <BoardDetails /> : <Navigate to="/auth" />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;

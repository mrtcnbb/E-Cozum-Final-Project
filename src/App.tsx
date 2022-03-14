import './App.css';
import BoardCard from './components/BoardsPageComponents/BoardCard';
import BoardsList from './components/BoardsPageComponents/BoardsList';
import Header from './components/HomePageComponents/Header';
import Auth from './pages/auth/Auth';

function App() {
  return (
    <div>
      <Header />
      <Auth />
      <BoardsList />
    </div>
  );
}

export default App;

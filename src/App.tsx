import './App.css';
import BoardCard from './components/BoardsPageComponents/BoardCard';
import Header from './components/HomePageComponents/Header';
import Auth from './pages/auth/Auth';

function App() {
  return (
    <div>
      <Header />
      <BoardCard />
      <Auth />
    </div>
  );
}

export default App;

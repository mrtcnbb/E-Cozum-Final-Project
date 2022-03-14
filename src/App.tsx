import './App.css';
import BoardCard from './components/BoardsPageComponents/BoardCard';
import Header from './components/HomePageComponents/Header';
import Auth from './pages/auth/Auth';

function App() {
  return (
    <div>
      <Header />
      <BoardCard addBoard={false} boardName="ACME Frontend Applications" />
      <BoardCard addBoard={true} />
      <Auth />
    </div>
  );
}

export default App;

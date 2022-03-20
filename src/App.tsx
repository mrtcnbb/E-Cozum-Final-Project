import './App.css';
import CardModal from './components/BoardDetailsPageComponents/CardModal';
import BoardsList from './components/BoardsPageComponents/BoardsList';
import Header from './components/HomePageComponents/Header';
import Auth from './pages/auth/Auth';

function App() {
  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <Auth />
      <BoardsList />
      <br />
      <br />
      <br />
      <CardModal />
    </div>
  );
}

export default App;

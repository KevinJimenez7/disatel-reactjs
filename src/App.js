import './App.css';
import LoadingScreen from './components/loadingScreen';
import AppRouter from './routes/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import ModalError from './views/modals/modalError';
import ModalMessage from './views/modals/modalMessage';

function App() {
  return (
    <div className="App">
      <ModalMessage/>
      <ModalError/>
      <BrowserRouter basename='/'>
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;

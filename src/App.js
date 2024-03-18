import './App.css';
import LoadingScreen from './components/loadingScreen';
import AppRouter from './routes/AppRouter';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename='/'>
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;

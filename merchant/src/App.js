import { BrowserRouter } from 'react-router-dom';
import './assets/styles/style.scss';
import PageRoutes from './pages/Routes.js';


const App = () => {
  return (
    <BrowserRouter>
      <PageRoutes />
    </BrowserRouter>
  );
}

export default App;

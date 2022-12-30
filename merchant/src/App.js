import { HashRouter } from 'react-router-dom';
import './assets/styles/style.scss';
import PageRoutes from './pages/Routes.js';


const App = () => {
  return (
    <HashRouter>
      <PageRoutes />
    </HashRouter>
  );
}

export default App;

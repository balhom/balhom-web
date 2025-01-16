import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import './assets/styles/global.css';
import './i18n/config';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
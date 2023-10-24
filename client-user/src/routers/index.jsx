import { createBrowserRouter } from 'react-router-dom';
import ItemsPage from '../views/ItemsPage';
import HomePage from '../views/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [
      {
        path: '',
        element: <ItemsPage />,
      },
    ],
  },
]);

export default router;

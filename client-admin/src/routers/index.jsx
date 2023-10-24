import { createBrowserRouter, redirect } from 'react-router-dom';
import LoginPage from '../views/LoginPage';
import HomePage from '../views/HomePage';
import ItemsPage from '../views/ItemsPage';
import CategoriesPage from '../views/CategoriesPage';
import RegisterAdmin from '../views/RegisterAdmin';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <HomePage />,
    loader: () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        return redirect('/login');
      }

      return null;
    },
    children: [
      {
        path: '',
        element: <ItemsPage />,
      },
      {
        path: 'categories',
        element: <CategoriesPage />,
      },
      {
        path: 'items',
        element: <ItemsPage />,
      },
      {
        path: 'register',
        element: <RegisterAdmin />,
      },
    ],
  },
]);

export default router;

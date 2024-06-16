import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { CreateProjectPage, HomePage, ProjectPage } from './pages';
import { Layout } from './components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/create-project',
        element: <CreateProjectPage />,
      },
      {
        path: '/projects/:id',
        element: <ProjectPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};

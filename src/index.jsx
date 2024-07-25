import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import NotFound from './Pages/NotFound'
import Home from './Pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound /> 
  },
  {
    path: '/home',
    element: <Home auth={false} />
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


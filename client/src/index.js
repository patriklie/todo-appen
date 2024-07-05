import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux'
import Layout from './routes/Layout';
import Home from './routes/Home';
import About from './routes/About';
import Register from './routes/Register';
import Login from './routes/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './routes/Profile';
import RouteProtector from './components/RouteProtector';
import ErrorPage from './routes/ErrorPage';
import TodosStart from './routes/TodosStart';
import SingleTodoList from './components/SingleTodoList';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteProtector>
        <Layout />
      </RouteProtector>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "lists",
        element: <TodosStart />
      },
      {
        path: "lists/:id",
        element: <SingleTodoList />
      },
      {
        path: "profile",
        element: <Profile />
      }
    ]
  },
  {
    path: "register",
    element: <Register />
  },
  {
    path: "login",
    element: <Login />
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/layout';
import Dashboard from '../pages/dashboard/dashboard';
import Incomes from '../pages/incomes/incomes';
import AddIncome from '../pages/incomes/add-income/add-income';
import IncomeDetails from '../pages/incomes/income-details/income-details';
import Expenses from '../pages/expenses/expenses';
import Settings from '../pages/settings/settings';
import SignIn from '../pages/auth/sign-in/sign-in';
import SignUp from '../pages/auth/sign-up/sign-up';
import VerifyEmail from '../pages/auth/verify-email/verify-email';
import ForgotPassword from '../pages/auth/forgot-password/forgot-password';
import CreateCurrencyProfile from '../pages/currency-profile/create-currency-profile';
import NotFound from '../pages/not-found/not-found';
import ProtectedRoute from '../components/auth/protected-route';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/income',
        element: (
          <ProtectedRoute>
            <Incomes />
          </ProtectedRoute>
        ),
      },
      {
        path: '/income/add',
        element: (
          <ProtectedRoute>
            <AddIncome />
          </ProtectedRoute>
        ),
      },
      {
        path: '/income/:id',
        element: (
          <ProtectedRoute>
            <IncomeDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: '/expenses',
        element: (
          <ProtectedRoute>
            <Expenses />
          </ProtectedRoute>
        ),
      },
      {
        path: '/settings',
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: '/sign-in', element: <SignIn /> },
  { path: '/sign-up', element: <SignUp /> },
  { path: '/verify-email', element: <VerifyEmail /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/create-currency-profile', element: <CreateCurrencyProfile /> },
  { path: '*', element: <NotFound /> },
]);
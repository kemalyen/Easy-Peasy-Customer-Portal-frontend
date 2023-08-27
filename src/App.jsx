import './App.css'
import Layout from './components/layout'
import DashboardPage from './pages/DashboardPage'
import CustomerCreate from './pages/Customers/CustomerCreate'
import CustomerEdit from './pages/Customers/CustomerEdit'
import UserListByCustomer from './pages/Customers/Users';
import UsersList from './pages/Users/UsersList';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Routes, Route } from 'react-router-dom';
import UserEdit from './pages/Users/UserEdit'
import LoginPage from './pages/Auth/Login'
import RequireAuth from './components/RequireAuth'
import UnauthorizedPage from './pages/UnauthorizedPage'
import UserCreate from './pages/Users/UserCreate'
import LogoutPage from './pages/Auth/Logout'
import VerifyEmailPage from './pages/Auth/VerifyEmailPage'
import PaswordResetPage from './pages/Auth/PaswordResetPage'
import PaswordResetFormPage from './pages/Auth/PaswordResetFormPage'
import PaswordEmailPage from './pages/Auth/PaswordEmailPage'
import ProfilePage from './pages/ProfilePage'
import { ToastContainer, toast } from 'react-toastify';
const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Layout />}>

          <Route path='login' element={<LoginPage />} />
          <Route path='logout' element={<LogoutPage />} />
          <Route path='verify-email' element={<VerifyEmailPage />} />

          <Route path='password/email' element={<PaswordEmailPage />} />
          <Route path='password/reset' element={<PaswordResetFormPage />} />
          <Route path='password/reset/:token' element={<PaswordResetPage />} />
          {/* 
      
      <Route path='register' element={<RegisterPage />} />
      <Route path='profile' element={<ProfilePage />} /> */}

          <Route element={<RequireAuth allowedRoles={['Admin', 'Manager', 'User']} />}>
            <Route index element={<DashboardPage />} />
            <Route path='customers/create' element={<CustomerCreate />} />
            <Route path='customers/:id/users' element={<UserListByCustomer />} />
            <Route path='customers/:id/edit' element={<CustomerEdit />} />
            <Route path='users/create' element={<UserCreate />} />
            <Route path='users' element={<UsersList />} />
            <Route path='users/:id/edit' element={<UserEdit />} />
            <Route path='profile' element={<ProfilePage />} />
          </Route>
          <Route path='unauthorized' element={<UnauthorizedPage />} />

        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App

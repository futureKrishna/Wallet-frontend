import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import MainWallet from './MainWallet';
import EmployeeDashboard from './EmployeeDashboard';
import MyEmployees from './MyEmployees';
import AllUsers from './AllUsers';
import WalletTransaction from './WalletTransaction';
import Layout from './Layout';
import Home from './Home';

const PrivateRoute = ({ element }) => {
  const token = useSelector((state) => state.auth.token);
  return token ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute element={<Layout />} />}>
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/get-all-users" element={<PrivateRoute element={<AllUsers />} />} />
        <Route path="/my-employees" element={<PrivateRoute element={<MyEmployees />} />} />
        <Route path="/wallet-transactions" element={<PrivateRoute element={<WalletTransaction />} />} />
        <Route path="/wallet" element={<PrivateRoute element={<MainWallet />} />} />
        <Route path="/employee-dashboard" element={<PrivateRoute element={<EmployeeDashboard />} />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;

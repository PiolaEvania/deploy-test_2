import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterPages from './pages/RegisterPages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPages from './pages/LoginPages';
import DashboardPages from './pages/DashboardPages';
import HomeViewPages from './pages/HomeViewPages';
import ProtectedRoute from './utils/ProtectedRoute';
import EditLaporanPages from './pages/EditLaporanPages';
import SendEmailPages from './pages/SendEmailPages';
import ForgotPasswordPages from './pages/ForgotPasswordPages';
import ResetPasswordPages from './pages/ResetPasswordPages';

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<RegisterPages />} />
        <Route path="/login" element={<LoginPages setUser={setUser} />} />
        <Route element={<ProtectedRoute allowedRoles={['671b672b3981db347cfd7832', '671b68433981db347cfd7834']} />}>
          <Route path="/home" element={<HomeViewPages />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['671b672b3981db347cfd7832']} />}>
          <Route path="/dashboard" element={<DashboardPages />} />
          <Route path="/dashboard/laporan/edit/:id" element={<EditLaporanPages />} />
          <Route path="/dashboard/sendStatus/:id" element={<SendEmailPages />} />
        </Route>
        <Route path="/forgotPassword" element={< ForgotPasswordPages />} />
        <Route path="/resetPassword/:token" element={< ResetPasswordPages />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;

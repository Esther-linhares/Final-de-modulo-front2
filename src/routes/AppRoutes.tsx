import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from '../config/layout/DefaultLayout';
import Signin from '../pages/SignIn';
import Notes from '../pages/Notes';
import SignUp from '../pages/SignUp';


const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/notes" element={<DefaultLayout component={Notes} />} />
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

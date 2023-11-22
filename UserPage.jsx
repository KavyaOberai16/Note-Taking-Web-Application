import React from 'react';
import { Register } from '../components/Register';

import { useLocation } from "react-router-dom";
import { Login } from '../components/Login';

export const UserPage = () => {
  const location = useLocation();

  return (
    <>
      
       {location.pathname === "/" && <Register />} 
   
    </>
  );
};

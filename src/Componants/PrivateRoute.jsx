import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isSignedIn }) => {
  return isSignedIn ? children : <Navigate to="/Signin" />;
};

export default PrivateRoute;

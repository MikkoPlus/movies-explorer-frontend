import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoggedInContext } from '../../../contexts/LoggedInContext';
const ProtectedRouteElement = ({ element: Component, ...props }) => {
  const isLoggedIn = useContext(LoggedInContext);

  return isLoggedIn ? <Component {...props} /> : <Navigate to='/' />;
};

export default ProtectedRouteElement;

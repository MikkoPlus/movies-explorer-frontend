import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProtectedRouteElement = ({
  element: Component,
  isLoggedIn,
  ...props
}) => {
  const [path, setPath] = useState('');
  useEffect(() => {
    setPath(localStorage.getItem('lastVisit'));
  });

  return !isLoggedIn ? <Component {...props} /> : <Navigate to={path} />;
};

export default ProtectedRouteElement;

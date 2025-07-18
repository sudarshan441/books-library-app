import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;

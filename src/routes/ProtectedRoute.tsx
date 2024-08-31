import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet } from 'react-router-dom';

import { auth } from '@/api/firebaseApp';

const ProtectedRoute: React.FC = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  // return user ? <Navigate to="/" replace /> : <Outlet />;
  return user ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;

import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet } from 'react-router-dom';

import { auth } from '@/api/firebaseApp';
import Loading from '@/components/common/loading/Loading';

const ProtectedRoute: React.FC = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Loading />;
  }

  // return user ? <Outlet /> : <Navigate to="/" replace />;
  return user ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;

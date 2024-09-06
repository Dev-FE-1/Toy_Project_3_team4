import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet } from 'react-router-dom';

import { auth } from '@/api/firebaseApp';
import Loading from '@/components/common/loading/Loading';

const PublicRoute: React.FC = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Loading />;
  }

  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;

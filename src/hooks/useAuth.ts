import { useState, useEffect } from 'react';

import { onAuthStateChanged, User } from 'firebase/auth';

import { auth } from '@/api/firebaseApp';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return currentUser;
};

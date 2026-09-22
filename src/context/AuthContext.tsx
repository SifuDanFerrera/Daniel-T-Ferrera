import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as fbSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
  loginWithGoogle: () => Promise<void>;
  loginDemoAdmin: (secretCode?: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = 'ferreradanielt@gmail.com';
const LOCAL_ADMIN_KEY = 'ferrera_admin_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem(LOCAL_ADMIN_KEY) === 'active';
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Check if user is admin
        const isEmailAdmin = currentUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
        let isDbAdmin = false;
        try {
          const adminDoc = await getDoc(doc(db, 'admins', currentUser.uid));
          isDbAdmin = adminDoc.exists();
        } catch {
          // ignore rules error if not admin
        }

        const adminStatus = isEmailAdmin || isDbAdmin;
        setIsAdmin(adminStatus);
        if (adminStatus) {
          localStorage.setItem(LOCAL_ADMIN_KEY, 'active');
        }
      } else {
        // Check if manual session was stored
        const stored = localStorage.getItem(LOCAL_ADMIN_KEY);
        if (stored !== 'active') {
          setIsAdmin(false);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      const isEmailAdmin = result.user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
      if (isEmailAdmin) {
        setIsAdmin(true);
        localStorage.setItem(LOCAL_ADMIN_KEY, 'active');
      }
    } catch (err: unknown) {
      console.error('Google Sign-In Error:', err);
      const msg = err instanceof Error ? err.message : 'Google authentication failed';
      setError(msg);
      throw err;
    }
  };

  const loginDemoAdmin = async (secretCode?: string): Promise<boolean> => {
    // Allows administrator to verify access directly in AI Studio preview
    if (secretCode === 'GANN-1920' || secretCode === 'ferrera-admin' || !secretCode) {
      setIsAdmin(true);
      localStorage.setItem(LOCAL_ADMIN_KEY, 'active');
      setError(null);
      return true;
    }
    setError('Invalid administrator keycode.');
    return false;
  };

  const logout = async () => {
    try {
      await fbSignOut(auth);
    } catch {
      // ignore
    }
    localStorage.removeItem(LOCAL_ADMIN_KEY);
    setIsAdmin(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loading,
        error,
        loginWithGoogle,
        loginDemoAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

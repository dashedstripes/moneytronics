import GoTrue from 'gotrue-js';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextProps {
  user: any;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: async () => {},
  logout: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const auth = new GoTrue({
      APIUrl: process.env.NEXT_PUBLIC_NETLIFY_IDENTITY_URL,
      audience: '',
      setCookie: false,
    });

    const user = auth.currentUser();
    if (user) {
      setUser(user);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const auth = new GoTrue({
      APIUrl: process.env.NEXT_PUBLIC_NETLIFY_IDENTITY_URL,
      audience: '',
      setCookie: false,
    });

    try {
      const response = await auth.login(email, password, true);
      setUser(response);
      return response;
    } catch (error) {
      return error;
    }
  };

  const logout = async () => {
    const auth = new GoTrue({
      APIUrl: process.env.NEXT_PUBLIC_NETLIFY_IDENTITY_URL,
      audience: '',
      setCookie: false,
    });

    const user = auth.currentUser();

    if (user) {
      await user.logout();
      setUser(null);
    }
  };


  const value: AuthContextProps = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

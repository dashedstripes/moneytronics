"use client"

import GoTrue from 'gotrue-js';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextProps {
  user: any;
  authLoading: boolean;
  signup: (email: string, password: string) => Promise<any>;
  confirm: (token: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  getJWT: () => Promise<string | undefined>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  authLoading: false,
  signup: async () => {},
  confirm: async () => {},
  login: async () => {},
  logout: async () => {},
  getJWT: async () => '',
});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(false);

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

  const signup = async(email: string, password: string) => {
    const auth = new GoTrue({
      APIUrl: process.env.NEXT_PUBLIC_NETLIFY_IDENTITY_URL,
      audience: '',
      setCookie: false,
    });

    try {
      setAuthLoading(true);
      await auth.signup(email, password);
      setAuthLoading(false);
    } catch (error) {
      setAuthLoading(false);
      throw error;
    }
  }

  const confirm = async (token: string) => {
    const auth = new GoTrue({
      APIUrl: process.env.NEXT_PUBLIC_NETLIFY_IDENTITY_URL,
      audience: '',
      setCookie: false,
    });

    try {
      setAuthLoading(true);
      const response = await auth.confirm(token, true);
      setUser(response);
      setAuthLoading(false);
      return response;
    } catch (error) {
      setAuthLoading(false);
      throw error;
    }
  }

  const login = async (email: string, password: string) => {
    const auth = new GoTrue({
      APIUrl: process.env.NEXT_PUBLIC_NETLIFY_IDENTITY_URL,
      audience: '',
      setCookie: false,
    });

    try {
      setAuthLoading(true);
      const response = await auth.login(email, password, true);
      setUser(response);
      setAuthLoading(false);
      return response;
    } catch (error) {
      setAuthLoading(false);
      throw error;
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
      try {
        setAuthLoading(true);
        await user.logout();
        setUser(null);
        setAuthLoading(false);
      } catch (error) {
        setAuthLoading(false);
        throw error;
      }
    }
  };

  const getJWT = async () => {
    const auth = new GoTrue({
      APIUrl: process.env.NEXT_PUBLIC_NETLIFY_IDENTITY_URL,
      audience: '',
      setCookie: false,
    });

    const user = auth.currentUser();

    if (user) {
      try {
        setAuthLoading(true);
        const jwt = await user.jwt();
        setAuthLoading(false);
        return jwt;
      } catch (error) {
        setAuthLoading(false);
        throw error;
      }
    }
  }

  const value: AuthContextProps = {
    user,
    authLoading,
    signup,
    confirm,
    login,
    logout,
    getJWT,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

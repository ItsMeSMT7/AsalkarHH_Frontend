import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  login as loginApi,
  signup as signupApi,
  getProfile,
} from '../api/authApi';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('vitahub_token'));
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!token && !!user;
  const isAdmin = user?.role === 2;

  const fetchProfile = useCallback(async () => {
    try {
      const response = await getProfile();
      if (response.success && response.data) {
        setUser(response.data);
        localStorage.setItem('vitahub_user', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      logoutUser();
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('vitahub_token');
      const savedUser = localStorage.getItem('vitahub_user');

      if (savedToken) {
        setToken(savedToken);
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch (e) {
            console.error('Failed to parse saved user');
          }
        }
        try {
          await fetchProfile();
        } catch (error) {
          logoutUser();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [fetchProfile]);

  const loginUser = async (identifier, password) => {
    const response = await loginApi({ identifier, password });
    if (response.success && response.data) {
      const { token: newToken, ...userData } = response.data;
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('vitahub_token', newToken);
      localStorage.setItem('vitahub_user', JSON.stringify(userData));
      return response;
    }
    throw new Error(response.message || 'Login failed');
  };

  const signupUser = async (data) => {
    const response = await signupApi(data);
    if (response.success && response.data) {
      const { token: newToken, ...userData } = response.data;
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('vitahub_token', newToken);
      localStorage.setItem('vitahub_user', JSON.stringify(userData));
      return response;
    }
    throw new Error(response.message || 'Signup failed');
  };

  const logoutUser = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('vitahub_token');
    localStorage.removeItem('vitahub_user');
  };

  const updateUser = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
    const currentUser = JSON.parse(
      localStorage.getItem('vitahub_user') || '{}'
    );
    localStorage.setItem(
      'vitahub_user',
      JSON.stringify({ ...currentUser, ...updatedData })
    );
  };

  const value = {
    user,
    token,
    isAuthenticated,
    isAdmin,
    loading,
    login: loginUser,
    signup: signupUser,
    logout: logoutUser,
    updateUser,
    fetchProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
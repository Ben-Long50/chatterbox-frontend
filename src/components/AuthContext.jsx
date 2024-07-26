import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Loading from './Loading';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? true : false;
  });
  const [currentUser, setCurrentUser] = useState(() => {
    if (localStorage.getItem('user')) {
      return localStorage.getItem('user');
    } else {
      const token = localStorage.getItem('token');
      if (token) {
        const userToken = jwtDecode(token);
        const user = userToken.user;
        localStorage.setItem('user', user);
        setCurrentUser(user);
      }
    }
  });

  const apiUrl = 'http://localhost:3000';

  const authTimer = 1000 * 60 * 60 * 4;

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (token) {
      const userToken = jwtDecode(token);
      const user = userToken.user;
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const signin = () => {
    const token = localStorage.getItem('token');
    const userToken = jwtDecode(token);
    const user = userToken.user;
    setCurrentUser(user);
    setIsAuthenticated(true);
    setTimeout(() => {
      localStorage.removeItem('activeId');
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }, authTimer);
  };

  const signout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('activeId');
    localStorage.removeItem('token');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signin,
        signout,
        apiUrl,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

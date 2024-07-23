import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? true : false;
  });
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userToken = jwtDecode(token);
      const user = userToken.user;
      setCurrentUser(user);
    }
  }, [isAuthenticated]);

  const apiUrl = 'http://localhost:3000';

  const signin = () => {
    setIsAuthenticated(true);
  };

  const signout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signin,
        signout,
        apiUrl,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

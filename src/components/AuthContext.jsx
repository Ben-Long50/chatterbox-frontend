import { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? true : false;
  });

  const apiUrl = 'http:/localhost:3000';

  const signin = () => {
    setIsAuthenticated(true);
  };

  const signout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signin, signout, apiUrl }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

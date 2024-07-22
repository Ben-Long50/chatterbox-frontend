import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? true : false;
  });
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userToken = jwtDecode(token);
      const currentUserId = userToken.user._id;
      const currentUsername = userToken.user.username;
      setUserId(currentUserId);
      setUsername(currentUsername);
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
      value={{ isAuthenticated, signin, signout, apiUrl, userId, username }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

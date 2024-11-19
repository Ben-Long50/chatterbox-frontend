import { Outlet } from 'react-router-dom';
import AuthProvider from './components/AuthContext';
import ThemeProvider from './components/ThemeContext';
import LayoutProvider from './components/LayoutContext';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient.js';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LayoutProvider>
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        </LayoutProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

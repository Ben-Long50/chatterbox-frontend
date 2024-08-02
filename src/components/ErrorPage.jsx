import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ErrorPage = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const token = localStorage.getItem('token');

  return (
    <div
      className={`${theme} flex h-dvh w-dvw flex-col items-center justify-center gap-8 bg-white p-4 dark:bg-gray-900`}
    >
      <h1 className="text-primary text-center text-5xl font-semibold">
        {token ? 'This page does not exist' : 'Your session is expired'}
      </h1>

      <Link
        className="accent-primary rounded px-4 py-3 text-xl text-gray-900 transition duration-300 hover:scale-105"
        to={token ? '/signin' : '/signin'}
      >
        {token ? 'Sign in' : 'Sign in'}
      </Link>
    </div>
  );
};

export default ErrorPage;

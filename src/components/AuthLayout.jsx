import { Outlet } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import { useContext } from 'react';
import Icon from '@mdi/react';
import { mdiWeatherSunny, mdiWeatherNight } from '@mdi/js';

const AuthLayout = () => {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <div className={`${theme} grid min-h-dvh grid-cols-2`}>
      <div className="z-10 col-start-1 col-end-3 flex flex-col items-center justify-center bg-gray-200 lg:col-end-2 dark:bg-gray-900">
        <button
          className="text-secondary absolute left-0 top-0 m-4 flex items-center gap-4 rounded p-2 text-xl transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-800"
          onClick={changeTheme}
        >
          Theme
          <Icon
            path={theme === 'dark' ? mdiWeatherSunny : mdiWeatherNight}
            size={1.2}
          />
        </button>
        <Outlet />
      </div>
      <div className="group container hidden overflow-hidden bg-white lg:col-start-2 lg:col-end-3 lg:block dark:bg-gray-700">
        <div className="animation-0 absolute left-1/2 top-12 z-0 h-12 overflow-hidden rounded-r-full bg-gray-300 shadow-lg shadow-gray-400 dark:bg-gray-900 dark:shadow-gray-900"></div>
        <div className="animation-2 absolute right-0 top-1/2 z-0 h-24 overflow-hidden rounded-l-full bg-yellow-200 shadow-lg shadow-gray-400 dark:shadow-gray-900"></div>
        <div className="animation-3 absolute left-1/2 top-3/4 z-0 h-16 overflow-hidden rounded-r-full bg-gray-300 shadow-lg shadow-gray-400 dark:bg-gray-900 dark:shadow-gray-900"></div>
        <div className="animation-1 absolute bottom-16 right-0 z-0 h-16 overflow-hidden rounded-l-full bg-yellow-200 shadow-lg shadow-gray-400 dark:shadow-gray-900"></div>
        <div className="flex h-2/5 flex-col items-start justify-end gap-10">
          <h1 className="text-primary line z-10 text-6xl/normal font-semibold">
            Welcome to Chatterbox!
          </h1>
          <h2 className="text-secondary z-10 text-2xl/normal">
            The premier anonymous chat room of the web
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

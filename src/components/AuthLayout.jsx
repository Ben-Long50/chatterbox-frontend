import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="grid min-h-dvh grid-cols-2">
      <div className="container flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-900">
        <Outlet />
      </div>
      <div className="container bg-white dark:bg-gray-700"></div>
    </div>
  );
};

export default AuthLayout;

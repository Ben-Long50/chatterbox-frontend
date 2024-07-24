import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="grid min-h-dvh grid-cols-2">
      <div className="col-start-1 col-end-3 flex flex-col items-center justify-center bg-gray-200 lg:col-end-2 dark:bg-gray-900">
        <Outlet />
      </div>
      <div className="group container hidden overflow-hidden bg-white lg:col-start-2 lg:col-end-3 lg:block dark:bg-gray-700">
        <div className="animation-1 absolute left-1/2 top-12 z-0 h-12 overflow-hidden rounded-r-full bg-yellow-200 shadow-lg shadow-gray-400 dark:shadow-gray-900"></div>
        <div className="animation-2 absolute right-0 top-1/2 z-0 h-24 overflow-hidden rounded-l-full bg-yellow-200 shadow-lg shadow-gray-400 dark:shadow-gray-900"></div>
        <div className="animation-3 absolute left-1/2 top-3/4 z-0 h-16 overflow-hidden rounded-r-full bg-yellow-200 shadow-lg shadow-gray-400 dark:shadow-gray-900"></div>
        <div className="animation-1 absolute bottom-16 right-0 z-0 h-16 overflow-hidden rounded-l-full bg-yellow-200 shadow-lg shadow-gray-400 dark:shadow-gray-900"></div>
        <div className="flex h-2/5 flex-col items-start justify-end gap-10">
          <h1 className="text-primary line z-10 text-6xl/normal font-semibold">
            Welcome to Chatterbox!
          </h1>
          <h2 className="text-secondary z-10 text-2xl/normal">
            An anonymous chat room where you can make friends, exclusive chat
            rooms or even send a message to everyone in the global chat room!
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

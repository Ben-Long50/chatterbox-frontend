import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex bg-white dark:bg-gray-700">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default MainLayout;

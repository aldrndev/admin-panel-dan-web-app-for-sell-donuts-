import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const HomePage = () => {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />

        <div className="flex-grow overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default HomePage;

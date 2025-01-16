import { Outlet } from 'react-router-dom';
import AppHeader from './app-header';
import './layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <AppHeader />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
import { Outlet } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import "./app-main-layout.css";
import React from "react";

const AppMainLayout: React.FC = () => {
  return (
    <div className="app-main-layout">
      <AppHeader />
      <main className="app-main-layout-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AppMainLayout;

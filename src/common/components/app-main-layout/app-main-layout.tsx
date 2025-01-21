import "./app-main-layout.css";
import AppHeader from "../app-header/app-header";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const AppMainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="app-main-layout">
      <AppHeader />
      <main className="app-main-layout-content">{children}</main>
    </div>
  );
};

export default AppMainLayout;

import React from "react";
import "./app-loader-page.css";
import AppLoader from "../app-loader/app-loader";

interface Props {
  message?: string;
}

const AppLoaderPage: React.FC<Props> = ({ message }) => {
  return (
    <div className="app-loader-page-container">
      <AppLoader />
      <p className="app-loader-page-text">{message}</p>
    </div>
  );
};

export default AppLoaderPage;

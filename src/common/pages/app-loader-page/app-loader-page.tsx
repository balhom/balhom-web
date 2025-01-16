import React from "react";
import "./app-loader-page.css";

interface Props {
  message?: string;
}

const AppLoaderPage: React.FC<Props> = ({ message }) => {
  return (
    <div className="app-loader-page-container">
      <div className="app-loader-page"></div>
      <p className="app-loader-page-text">{message}</p>
    </div>
  );
};

export default AppLoaderPage;

import React from "react";
import "./section-container.css";

interface Props {
  children: React.ReactNode;
}

const SectionContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="section-container-background">
      <div className="section-container-card">{children}</div>
    </div>
  );
};

export default SectionContainer;

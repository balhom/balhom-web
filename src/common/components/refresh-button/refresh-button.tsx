import { RefreshCw } from "lucide-react";
import "./refresh-button.css";
import React from "react";

interface Props {
  onClick?: () => void;
  isLoading?: boolean;
  "aria-label"?: string;
}

const RefreshButton: React.FC<Props> = ({
  onClick,
  isLoading = false,
  "aria-label": ariaLabel = "Refresh data",
}: Props) => {
  return (
    <button
      className={`refresh-button ${isLoading ? "refresh-button-loader" : ""}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <RefreshCw size={20} />
    </button>
  );
};

export default RefreshButton;

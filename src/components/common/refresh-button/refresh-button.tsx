import { RefreshCw } from 'lucide-react';
import './refresh-button.css';

interface RefreshButtonProps {
  onClick?: () => void;
  'aria-label'?: string;
}

const RefreshButton = ({ 
  onClick, 
  'aria-label': ariaLabel = 'Refresh data' 
}: RefreshButtonProps) => {
  return (
    <button 
      className="refresh-button"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <RefreshCw size={20} />
    </button>
  );
};

export default RefreshButton;
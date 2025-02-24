import "./icon-button.css";

interface Props {
  icon: React.ReactNode;
  onClick?: () => void;
}

const IconButton: React.FC<Props> = ({ icon, onClick }: Props) => {
  return (
    <button className="icon-button" onClick={onClick}>
      {icon}
    </button>
  );
};

export default IconButton;

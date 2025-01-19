import "./app-button.css";

interface Props {
  text: string;
  onClick?: () => void;
}

const AppButton = ({ text, onClick }: Props) => {
  return (
    <button className="app-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default AppButton;

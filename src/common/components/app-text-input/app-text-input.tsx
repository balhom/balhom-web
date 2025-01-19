import AppErrorText from "../app-error-text/app-error-text";
import "./app-text-input.css";

interface Props {
  id: string;
  text: string;
  onTextChange: (value: string) => void;
  errorText?: string;
  placeholder?: string;
}

const AppTextInput: React.FC<Props> = ({
  id,
  text,
  onTextChange,
  errorText,
  placeholder,
}: Props) => {
  return (
    <>
      <input
        id={id}
        className="app-text-input"
        type="text"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder={placeholder}
      />
      <AppErrorText text={errorText} />
    </>
  );
};

export default AppTextInput;

import AppErrorText from "../../../../common/components/app-error-text/app-error-text";
import "./auth-text-input.css";

interface Props {
  id: string;
  text: string;
  onTextChange: (value: string) => void;
  errorText?: string;
  placeholder?: string;
}

const AuthTextInput = ({
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
        className="auth-text-input"
        type="text"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder={placeholder}
      />
      <AppErrorText text={errorText} />
    </>
  );
};

export default AuthTextInput;

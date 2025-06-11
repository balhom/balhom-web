import AppErrorText from "../app-error-text/app-error-text";
import "./app-text-input.css";

interface Props {
  id: string;
  text: string;
  onTextChange: (value: string) => void;
  errorText?: string;
  maxLength?: number;
  placeholder?: string;
  isReadOnly?: boolean;
}

const AppTextInput: React.FC<Props> = ({
  id,
  text,
  onTextChange,
  errorText,
  maxLength,
  placeholder,
  isReadOnly,
}: Props) => {
  if (isReadOnly) {
    return (
      <div>
        <div className="app-text-input-box">
          <p>{text}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <input
        id={id}
        className="app-text-input"
        type="text"
        value={text}
        onChange={(e) => {
          if (maxLength && e.target.value.length > maxLength) {
            return;
          }
          onTextChange(e.target.value);
        }}
        placeholder={placeholder}
        readOnly={isReadOnly}
      />
      {maxLength && (
        <p className="app-text-input-char-count">
          {text.length}/{maxLength}
        </p>
      )}
      <AppErrorText text={errorText} />
    </div>
  );
};

export default AppTextInput;

import AppErrorText from "../app-error-text/app-error-text";
import "./app-text-area.css";

interface Props {
  id: string;
  text: string;
  onTextChange: (value: string) => void;
  errorText?: string;
  maxLength?: number;
  rows?: number;
  placeholder?: string;
}

const AppTextArea: React.FC<Props> = ({
  id,
  text,
  onTextChange,
  errorText,
  maxLength,
  rows,
  placeholder,
}: Props) => {
  return (
    <div>
      <textarea
        id={id}
        className="app-text-area"
        value={text}
        rows={rows}
        onChange={(e) => {
          if (maxLength && e.target.value.length > maxLength) {
            return;
          }
          onTextChange(e.target.value);
        }}
        placeholder={placeholder}
      />
      {maxLength && (
        <p className="app-text-area-char-count">
          {text.length}/{maxLength}
        </p>
      )}
      <AppErrorText text={errorText} />
    </div>
  );
};

export default AppTextArea;

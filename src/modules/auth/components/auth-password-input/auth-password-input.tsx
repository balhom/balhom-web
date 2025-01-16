import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./password-input.css";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface Props {
  id: string;
  text: string;
  onTextChange: (value: string) => void;
  errorText?: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

const AuthPasswordInput = ({
  id,
  text,
  onTextChange,
  errorText,
  label,
  placeholder = "••••••••",
}: Props) => {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div className="auth-password-input-wrapper">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder={placeholder}
        />
        <button
          type="button"
          className="auth-password-button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={
            showPassword ? t("auth.hidePassword") : t("auth.showPassword")
          }
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      {errorText && <p className="auth-password-error">{errorText}</p>}
    </div>
  );
};

export default AuthPasswordInput;

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import AppErrorText from "../../../../common/components/app-error-text/app-error-text";
import "./auth-password-input.css";

interface Props {
  id: string;
  text: string;
  onTextChange: (value: string) => void;
  errorText?: string;
}

const AuthPasswordInput = ({ id, text, onTextChange, errorText }: Props) => {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="auth-password-input-wrapper">
        <input
          id={id}
          className="auth-password-input"
          type={showPassword ? "text" : "password"}
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="••••••••"
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
      <AppErrorText text={errorText} />
    </>
  );
};

export default AuthPasswordInput;

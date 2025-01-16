import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import EyeIcon from '../icons/eye-icon';
import EyeOffIcon from '../icons/eye-off-icon';
import './password-input.css';

interface PasswordInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  required?: boolean;
}

const PasswordInput = ({
  id,
  value,
  onChange,
  label,
  placeholder = '••••••••',
  required = false
}: PasswordInputProps) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div className="password-input-wrapper">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          autoComplete="new-password"
        />
        <button
          type="button"
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
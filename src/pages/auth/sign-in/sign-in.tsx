import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/use-auth';
import PasswordInput from '../../../components/auth/password-input';
import './sign-in.css';

const SignIn = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signIn(email, password);
    navigate('/verify-email');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{t('auth.signIn')}</h1>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">{t('auth.email')}</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('auth.emailPlaceholder')}
              required
            />
          </div>
          <PasswordInput
            id="password"
            value={password}
            onChange={setPassword}
            label={t('auth.password')}
            required
          />
          <div className="auth-links">
            <Link to="/forgot-password" className="forgot-password-link">
              {t('auth.forgotPassword')}
            </Link>
          </div>
          <button type="submit" className="auth-button">
            {t('auth.signIn')}
          </button>
        </form>
        <div className="auth-footer">
          {t('auth.noAccount')}{' '}
          <Link to="/sign-up">{t('auth.signUp')}</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
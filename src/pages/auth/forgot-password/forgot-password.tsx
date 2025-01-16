import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './forgot-password.css';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="auth-container forgot-password">
        <div className="auth-card">
          <div className="auth-header">
            <h1>{t('auth.checkEmail')}</h1>
            <p>{t('auth.resetInstructions')}</p>
          </div>
          <div className="auth-footer">
            <Link to="/sign-in">{t('auth.backToSignIn')}</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container forgot-password">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{t('auth.forgotPassword')}</h1>
          <p>{t('auth.enterEmail')}</p>
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
          <button type="submit" className="auth-button">
            {t('auth.resetPassword')}
          </button>
        </form>
        <div className="auth-footer">
          <Link to="/sign-in">{t('auth.backToSignIn')}</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
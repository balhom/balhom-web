import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import PasswordInput from '../../../components/auth/password-input';
import './sign-up.css';

const SignUp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert(t('auth.passwordMismatch'));
      return;
    }

    try {
      sessionStorage.setItem('pendingVerification', email);
      navigate('/verify-email');
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  return (
    <div className="auth-container sign-up">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{t('auth.signUp')}</h1>
          <p>{t('auth.createAccount')}</p>
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
          <PasswordInput
            id="confirmPassword"
            value={confirmPassword}
            onChange={setConfirmPassword}
            label={t('auth.confirmPassword')}
            required
          />
          <button type="submit" className="auth-button">
            {t('auth.signUp')}
          </button>
        </form>
        <div className="auth-footer">
          {t('auth.haveAccount')}{' '}
          <Link to="/sign-in">{t('auth.signIn')}</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
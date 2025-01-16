import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './verify-email.css';

const VerifyEmail = () => {
  const { t } = useTranslation();
  const email = sessionStorage.getItem('pendingVerification');

  return (
    <div className="auth-container verify-email">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{t('auth.verifyEmail')}</h1>
          <p className="verification-message">
            {t('auth.verificationSent', { email })}
          </p>
        </div>
        <div className="verification-instructions">
          <p>{t('auth.checkInbox')}</p>
          <p className="spam-notice">{t('auth.checkSpam')}</p>
        </div>
        <div className="auth-footer">
          <Link to="/create-currency-profile">{t('auth.backToSignIn')}</Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
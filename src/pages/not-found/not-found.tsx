import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './not-found.css';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="not-found">
      <h1>404</h1>
      <p>{t('common.notFound')}</p>
      <Link to="/" className="home-link">{t('common.backToHome')}</Link>
    </div>
  );
};

export default NotFound;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/use-auth';
import CurrencySelect from '../../components/forms/currency-select/currency-select';
import ImagePicker from '../../components/forms/image-picker/image-picker';
import NumberInput from '../../components/forms/number-input/number-input';
import type { Currency } from '../../types/currency-profile';
import './create-currency-profile.css';

const CreateCurrencyProfile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [imageUrl, setImageUrl] = useState('');
  const [monthlySavingsGoal, setMonthlySavingsGoal] = useState(0);
  const [yearlySavingsGoal, setYearlySavingsGoal] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      // Mock saving profile
      console.log('Creating currency profile:', {
        userId: user.id,
        name,
        currency,
        imageUrl: imageUrl || undefined,
        monthlySavingsGoal,
        yearlySavingsGoal
      });
      
      navigate('/');
    } catch (err) {
      setError(t('currencyProfile.createError'));
      console.error('Error creating currency profile:', err);
    }
  };

  return (
    <div className="create-currency-profile-container">
      <div className="create-currency-profile-card">
        <div className="create-currency-profile-header">
          <h1>{t('currencyProfile.createCurrencyProfile')}</h1>
          <p>{t('currencyProfile.createDescription')}</p>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form className="create-currency-profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">{t('currencyProfile.name')}</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('currencyProfile.namePlaceholder')}
              required
            />
          </div>
          <CurrencySelect
            value={currency}
            onChange={setCurrency}
            required
          />
          <NumberInput
            id="monthlySavingsGoal"
            value={monthlySavingsGoal}
            onChange={setMonthlySavingsGoal}
            label={t('currencyProfile.monthlySavingsGoal')}
            currency={currency}
            required
          />
          <NumberInput
            id="yearlySavingsGoal"
            value={yearlySavingsGoal}
            onChange={setYearlySavingsGoal}
            label={t('currencyProfile.yearlySavingsGoal')}
            currency={currency}
            required
          />
          <ImagePicker
            value={imageUrl}
            onChange={setImageUrl}
          />
          <button type="submit" className="create-currency-profile-button">
            {t('currencyProfile.create')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCurrencyProfile;
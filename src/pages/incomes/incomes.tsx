import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCurrencyProfile } from '../../hooks/use-currency-profile';
import { mockIncomes } from '../../data/mock-incomes';
import DateSelector from '../../components/income/date-selector/date-selector';
import IncomeChart from '../../components/income/income-chart/income-chart';
import IncomeList from '../../components/income/income-list/income-list';
import './incomes.css';

const Incomes = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { profile } = useCurrencyProfile();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleRefresh = () => {
    // Will be implemented later
    console.log('Refresh data');
  };

  if (!profile) return null;

  return (
    <div className="incomes-page">
      <div className="incomes-header">
        <DateSelector
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={setSelectedMonth}
          onYearChange={setSelectedYear}
          onRefresh={handleRefresh}
        />
      </div>

      <div className="incomes-content">
        <section className="income-chart-section">
          <IncomeChart
            data={mockIncomes}
            currency={profile.currency}
          />
        </section>
        <section>
          <IncomeList
            incomes={mockIncomes}
            currency={profile.currency}
          />
        </section>
      </div>

      <button 
        className="add-income-button"
        onClick={() => navigate('/income/add')}
        aria-label={t('income.addIncome')}
      >
        <Plus size={24} />
      </button>
    </div>
  );
};

export default Incomes;
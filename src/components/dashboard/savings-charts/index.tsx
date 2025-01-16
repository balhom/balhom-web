import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrencyProfile } from '../../../hooks/use-currency-profile';
import { useSavingsData } from '../../../hooks/use-savings-data';
import MonthlySavingsChart from './monthly-savings-chart';
import YearlySavingsChart from './yearly-savings-chart';
import './savings-charts.css';

const SavingsCharts = () => {
  const { t } = useTranslation();
  const { profile } = useCurrencyProfile();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { monthlyData, yearlyData } = useSavingsData(
    selectedYear,
    profile?.monthlySavingsGoal || 0,
    profile?.yearlySavingsGoal || 0
  );

  if (!profile) return null;

  return (
    <div className="savings-charts-container">
      <h2 className="chart-title">{t('dashboard.savings')}</h2>
      <div className="charts-grid">
        <div className="savings-monthly-chart">
          <MonthlySavingsChart
            data={monthlyData}
            currency={profile.currency}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
          />
        </div>
        <div className="savings-yearly-chart">
          <YearlySavingsChart
            data={yearlyData}
            currency={profile.currency}
          />
        </div>
      </div>
    </div>
  );
};

export default SavingsCharts;
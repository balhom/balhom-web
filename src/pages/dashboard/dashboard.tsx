import { useTranslation } from 'react-i18next';
import TransactionCharts from '../../components/dashboard/transaction-charts';
import SavingsCharts from '../../components/dashboard/savings-charts';
import RefreshButton from '../../components/common/refresh-button/refresh-button';
import './dashboard.css';

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <RefreshButton onClick={() => {
          // Will be implemented later
          console.log('Refresh clicked');
        }} />
      </div>

      <section className="dashboard-section">
        <TransactionCharts />
      </section>

      <section className="dashboard-section">
        <SavingsCharts />
      </section>
    </div>
  );
};

export default Dashboard;
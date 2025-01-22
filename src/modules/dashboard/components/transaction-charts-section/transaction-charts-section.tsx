import "./transaction-charts-section.css";
import { useTranslation } from "react-i18next";
import DailyTransactionsChart from "../transactions-chart/daily-transactions-chart";
import MonthlyTransactionsChart from "../transactions-chart/monthly-transactions-chart";

const TransactionChartsSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="transaction-charts-section-title">
        {t("dashboard.transactionsSection")}
      </h2>
      <div className="transaction-charts-section-grid">
        <div className="transaction-charts-section-daily-part">
          <DailyTransactionsChart />
        </div>
        <div>
          <MonthlyTransactionsChart />
        </div>
      </div>
    </div>
  );
};

export default TransactionChartsSection;

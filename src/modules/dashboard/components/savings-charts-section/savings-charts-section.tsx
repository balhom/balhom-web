import MonthlySavingsChart from "../savings-chart/monthly-savings-chart";
import YearlySavingsChart from "../savings-chart/yearly-savings-chart";
import "./savings-charts-section.css";
import { useTranslation } from "react-i18next";

const SavingsChartsSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="savings-charts-section-title">
        {t("dashboard.savingsSection")}
      </h2>
      <div className="savings-charts-section-grid">
        <div>
          <MonthlySavingsChart />
        </div>
        <div className="savings-charts-section-yearly-chart">
          <YearlySavingsChart />
        </div>
      </div>
    </div>
  );
};

export default SavingsChartsSection;

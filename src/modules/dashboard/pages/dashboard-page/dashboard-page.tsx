import "./dashboard-page.css";
import RefreshButton from "../../../../common/components/refresh-button/refresh-button";

const DashboardPage: React.FC = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <RefreshButton
          onClick={() => {
            // TODO
          }}
        />
      </div>
      {/*
      <section className="dashboard-page-section">
        <TransactionCharts />
      </section>

      <section className="dashboard-page-section">
        <SavingsCharts />
      </section>
      */}
    </div>
  );
};

export default DashboardPage;

import "./transactions-list-page.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCurrencyProfiles } from "../../../currency-profile/states/contexts/currency-profiles-context";
import TransactionsCategoryChart from "../../components/transactions-category-chart/transaction-category-chart";
import { TransactionTypeEnum } from "../../data/enums/transaction-type-enum";
import TransactionsDateSection from "../../components/transactions-date-section/transactions-date-section";

interface Props {
  transactionType: TransactionTypeEnum;
}

const TransactionsListPage: React.FC<Props> = ({ transactionType }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { selectedCurrencyProfile } = useCurrencyProfiles();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleRefresh = () => {
    // Will be implemented later
    console.log("Refresh data");
  };

  if (!selectedCurrencyProfile) return null;

  return (
    <div className="transactions-list-page">
      <div className="transactions-list-page-header">
        <TransactionsDateSection
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={setSelectedMonth}
          onYearChange={setSelectedYear}
          onRefresh={handleRefresh}
        />
      </div>

      <div className="transactions-list-page-content">
        <section className="transactions-list-page-chart-section">
          <TransactionsCategoryChart
            type={transactionType}
            month={selectedMonth}
            year={selectedYear}
          />
        </section>
        {/*
        <section>
          <IncomeList incomes={mockIncomes} currency={profile.currency} />
        </section>
        */}
      </div>

      <button
        className="transactions-list-page-add-income-button"
        onClick={() => navigate("/income/add")}
        aria-label={t("income.addIncome")}
      >
        <Plus size={24} />
      </button>
    </div>
  );
};

export default TransactionsListPage;

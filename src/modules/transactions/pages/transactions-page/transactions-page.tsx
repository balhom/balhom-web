import "./transactions-page.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { useCurrencyProfiles } from "../../../currency-profile/states/contexts/currency-profiles-context";
import TransactionsCategoryChart from "../../components/transactions-category-chart/transaction-category-chart";
import { TransactionTypeEnum } from "../../data/enums/transaction-type-enum";
import TransactionsDateSection from "../../components/transactions-date-section/transactions-date-section";
import { EXPENSE_ADD_ROUTE_PATH, INCOME_ADD_ROUTE_PATH } from "../../routes";
import TransactionList from "../../components/transaction-list/transaction-list";

interface Props {
  transactionType: TransactionTypeEnum;
}

const TransactionsPage: React.FC<Props> = ({ transactionType }: Props) => {
  const navigate = useNavigate();

  const { selectedCurrencyProfile } = useCurrencyProfiles();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  if (!selectedCurrencyProfile) return null;

  return (
    <div className="transactions-page">
      <div className="transactions-page-header">
        <TransactionsDateSection
          type={transactionType}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={setSelectedMonth}
          onYearChange={setSelectedYear}
        />
      </div>

      <div className="transactions-page-content">
        <section className="transactions-page-chart-section">
          <TransactionsCategoryChart
            type={transactionType}
            month={selectedMonth}
            year={selectedYear}
          />
        </section>

        <section>
          <TransactionList
            type={transactionType}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
        </section>
      </div>

      <button
        className={`transactions-page-add-button ${transactionType.toLowerCase()}-background`}
        onClick={() =>
          navigate(
            transactionType === TransactionTypeEnum.Income
              ? INCOME_ADD_ROUTE_PATH
              : EXPENSE_ADD_ROUTE_PATH
          )
        }
      >
        <Plus size={24} />
      </button>
    </div>
  );
};

export default TransactionsPage;

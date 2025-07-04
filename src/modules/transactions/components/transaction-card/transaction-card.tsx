import "./transaction-card.css";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TransactionEntity } from "../../data/entities/transaction-entity";
import AppDeleteDialog from "../../../../common/components/app-delete-dialog/app-delete-dialog";
import { formatTransactionCategory } from "../../utils";
import { formatAmountAndCurrency } from "../../../currency-profile/utils";
import { TransactionTypeEnum } from "../../data/enums/transaction-type-enum";
import {
  EXPENSE_DETAILS_ROUTE_PATH,
  INCOME_DETAILS_ROUTE_PATH,
} from "../../routes";
import { deleteTransaction } from "../../usecases/delete-transaction-usecase";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../../../store";
import { useCurrencyProfiles } from "../../../currency-profile/states/contexts/currency-profiles-context";
import {
  fetchExpensesPageAsync,
  fetchIncomesPageAsync,
} from "../../states/redux/thunks/transactions-page-thunks";
import {
  deleteTransactionExpenseInPage,
  deleteTransactionIncomeInPage,
} from "../../states/redux/slices/transactions-page-slice";

interface Props {
  transaction: TransactionEntity;
  selectedMonth: number;
  selectedYear: number;
}

const TransactionCard: React.FC<Props> = ({
  transaction,
  selectedMonth,
  selectedYear,
}: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { selectedCurrencyProfile } = useCurrencyProfiles();

  // State to manage the delete confirmation dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const transactionsPageState = useSelector((state: AppState) =>
    transaction.type === TransactionTypeEnum.Income
      ? state.incomesPage
      : state.expensesPage
  );
  const dispatch: AppDispatch = useDispatch();

  const formattedDate = new Date(transaction.date).toLocaleDateString();

  const dispatchDeleteAndFecthTransactionsPageAsync = useCallback(() => {
    if (selectedCurrencyProfile) {
      if (transaction.type === TransactionTypeEnum.Income) {
        dispatch(deleteTransactionIncomeInPage(transaction.id));
        dispatch(
          fetchIncomesPageAsync({
            currencyProfileId: selectedCurrencyProfile.id,
            month: selectedMonth,
            year: selectedYear,
            search: transactionsPageState.search,
            filters: transactionsPageState.filter,
            sort: transactionsPageState.sortValue,
            pageNum: transactionsPageState.page.pageNum,
          })
        );
      } else {
        dispatch(deleteTransactionExpenseInPage(transaction.id));
        dispatch(
          fetchExpensesPageAsync({
            currencyProfileId: selectedCurrencyProfile.id,
            month: selectedMonth,
            year: selectedYear,
            search: transactionsPageState.search,
            filters: transactionsPageState.filter,
            sort: transactionsPageState.sortValue,
            pageNum: transactionsPageState.page.pageNum,
          })
        );
      }
    }
  }, [
    dispatch,
    selectedCurrencyProfile,
    selectedMonth,
    selectedYear,
    transaction.id,
    transaction.type,
    transactionsPageState.filter,
    transactionsPageState.page.pageNum,
    transactionsPageState.search,
    transactionsPageState.sortValue,
  ]);

  const handleDelete = useCallback(() => {
    if (selectedCurrencyProfile) {
      // Call usecase
      deleteTransaction(transaction.id);

      // Remove transaction from UI
      dispatchDeleteAndFecthTransactionsPageAsync();
    }
  }, [
    transaction,
    selectedCurrencyProfile,
    dispatchDeleteAndFecthTransactionsPageAsync,
  ]);

  if (!selectedCurrencyProfile) {
    return null;
  }

  return (
    <div className="transaction-card">
      <img
        src={transaction.category.image}
        alt={formatTransactionCategory(transaction.category.code, t)}
        className="transaction-card-category-image"
      />
      <div className="transaction-card-content">
        <h3 className="transaction-card-title">{transaction.title}</h3>
        <div
          className={`transaction-card-amount ${transaction.type.toLowerCase()}-color`}
        >
          {formatAmountAndCurrency(
            transaction.amount,
            selectedCurrencyProfile.currency
          )}
        </div>
        <div className="transaction-card-date">{formattedDate}</div>
      </div>
      <div className="transaction-card-actions">
        <button
          className="transaction-card-action-button transaction-card-view-button"
          onClick={() =>
            navigate(
              `${
                transaction.type === TransactionTypeEnum.Income
                  ? INCOME_DETAILS_ROUTE_PATH
                  : EXPENSE_DETAILS_ROUTE_PATH
              }/${transaction.id}`
            )
          }
          aria-label={t("transaction.viewTransaction")}
        >
          <Eye size={20} />
        </button>
        <button
          className="transaction-card-action-button transaction-card-delete-button"
          onClick={() => setIsDeleteDialogOpen(true)}
          aria-label={t("transaction.deleteTransaction")}
        >
          <Trash2 size={20} />
        </button>
      </div>

      <AppDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title={t("transaction.deleteConfirmTitle")}
        message={t("transaction.deleteConfirmMessage")}
      />
    </div>
  );
};

export default TransactionCard;

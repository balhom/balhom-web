import { Route } from "react-router-dom";
import TransactionsListPage from "./pages/transactions-list-page/transactions-list-page";
import { TransactionTypeEnum } from "./data/enums/transaction-type-enum";

export const INCOME_ROUTE_PATH = "/income";
export const EXPENSE_ROUTE_PATH = "/expense";

export const transactionsRoutes = () => {
  return (
    <>
      <Route
        path={INCOME_ROUTE_PATH}
        element={
          <TransactionsListPage transactionType={TransactionTypeEnum.Income} />
        }
      />
      <Route
        path={EXPENSE_ROUTE_PATH}
        element={
          <TransactionsListPage transactionType={TransactionTypeEnum.Expense} />
        }
      />
    </>
  );
};

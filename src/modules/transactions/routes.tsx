import { Route } from "react-router-dom";
import TransactionsListPage from "./pages/transactions-list-page/transactions-list-page";
import { TransactionTypeEnum } from "./data/enums/transaction-type-enum";

export const INCOME_ROUTE_PATH = "/income";
export const INCOME_ADD_ROUTE_PATH = "/income/add";
export const INCOME_VIEW_ROUTE_PATH = "/income/:id";

export const EXPENSE_ROUTE_PATH = "/expense";
export const EXPENSE_ADD_ROUTE_PATH = "/expense/add";
export const EXPENSE_VIEW_ROUTE_PATH = "/expense/:id";

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

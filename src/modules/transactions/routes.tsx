import { Route } from "react-router-dom";
import TransactionsListPage from "./pages/transactions-page/transactions-page";
import { TransactionTypeEnum } from "./data/enums/transaction-type-enum";
import TransactionDetailsPage from "./pages/transaction-details-page/transaction-details-page";

export const INCOME_ROUTE_PATH = "/income";
export const INCOME_ADD_ROUTE_PATH = "/income/add";
export const INCOME_DETAILS_ROUTE_PATH = INCOME_ROUTE_PATH + "/:id";

export const EXPENSE_ROUTE_PATH = "/expense";
export const EXPENSE_ADD_ROUTE_PATH = "/expense/add";
export const EXPENSE_DETAILS_ROUTE_PATH = EXPENSE_ROUTE_PATH + "/:id";

export const transactionsRoutes = () => {
  return (
    <>
      {/* Income Routes */}
      <Route
        path={INCOME_ROUTE_PATH}
        element={
          <TransactionsListPage transactionType={TransactionTypeEnum.Income} />
        }
      />
      <Route
        path={INCOME_DETAILS_ROUTE_PATH}
        element={<TransactionDetailsPage transactionType={TransactionTypeEnum.Income} />}
      />

      {/* Expense Routes */}
      <Route
        path={EXPENSE_ROUTE_PATH}
        element={
          <TransactionsListPage transactionType={TransactionTypeEnum.Expense} />
        }
      />
      <Route
        path={EXPENSE_DETAILS_ROUTE_PATH}
        element={<TransactionDetailsPage transactionType={TransactionTypeEnum.Expense} />}
      />
    </>
  );
};

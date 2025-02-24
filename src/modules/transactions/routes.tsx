import { Route } from "react-router-dom";
import TransactionsListPage from "./pages/transactions-page/transactions-page";
import { TransactionTypeEnum } from "./data/enums/transaction-type-enum";
import TransactionDetailsPage from "./pages/transaction-details-page/transaction-details-page";
import CreateOrEditTransactionPage from "./pages/create-or-edit-transaction-page/create-or-edit-transaction-page";

export const INCOME_ROUTE_PATH = "/income";
export const INCOME_CREATE_ROUTE_PATH = "/income/create";
export const INCOME_EDIT_ROUTE_PATH = "/income/edit";
export const INCOME_DETAILS_ROUTE_PATH = INCOME_ROUTE_PATH;

export const EXPENSE_ROUTE_PATH = "/expense";
export const EXPENSE_CREATE_ROUTE_PATH = "/expense/create";
export const EXPENSE_EDIT_ROUTE_PATH = "/expense/edit";
export const EXPENSE_DETAILS_ROUTE_PATH = EXPENSE_ROUTE_PATH;

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
        path={INCOME_CREATE_ROUTE_PATH}
        element={
          <CreateOrEditTransactionPage
            transactionType={TransactionTypeEnum.Income}
          />
        }
      />
      <Route
        path={INCOME_EDIT_ROUTE_PATH + "/:id"}
        element={
          <CreateOrEditTransactionPage
            transactionType={TransactionTypeEnum.Income}
          />
        }
      />
      <Route
        path={INCOME_DETAILS_ROUTE_PATH + "/:id"}
        element={
          <TransactionDetailsPage
            transactionType={TransactionTypeEnum.Income}
          />
        }
      />

      {/* Expense Routes */}
      <Route
        path={EXPENSE_ROUTE_PATH}
        element={
          <TransactionsListPage transactionType={TransactionTypeEnum.Expense} />
        }
      />
      <Route
        path={EXPENSE_CREATE_ROUTE_PATH}
        element={
          <CreateOrEditTransactionPage
            transactionType={TransactionTypeEnum.Expense}
          />
        }
      />
      <Route
        path={EXPENSE_EDIT_ROUTE_PATH + "/:id"}
        element={
          <CreateOrEditTransactionPage
            transactionType={TransactionTypeEnum.Expense}
          />
        }
      />
      <Route
        path={EXPENSE_DETAILS_ROUTE_PATH + "/:id"}
        element={
          <TransactionDetailsPage
            transactionType={TransactionTypeEnum.Expense}
          />
        }
      />
    </>
  );
};

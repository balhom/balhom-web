import { createAsyncThunk } from "@reduxjs/toolkit";
import { TransactionEntity } from "../../../data/entities/transaction-entity";
import { PageEntity } from "../../../../../common/data/entities/page-entity";
import { Either } from "../../../../../common/data/either";
import { AppError } from "../../../../../common/data/errors/app-error";
import { CurrencyProfileEntity } from "../../../../currency-profile/data/entities/currency-profile-entity";
import { TransactionTypeEnum } from "../../../data/enums/transaction-type-enum";
import { TransactionFiltersEntity } from "../../../data/entities/transaction-filters-entity";
import { TransactionSortEnum } from "../../../data/enums/transaction-sort-enum";
import { getTransactionsPage } from "../../../usecases/get-transactions-page-usecase";

export interface TransactionPageFetchAsyncProps {
  currencyProfile: CurrencyProfileEntity;
  month: number;
  year: number;
  search: string;
  filters: TransactionFiltersEntity;
  sort: TransactionSortEnum;
  pageNum: number;
}

// Fetch Incomes page action
export const fetchIncomesPageAsync = createAsyncThunk<
  Either<AppError, PageEntity<TransactionEntity>>,
  TransactionPageFetchAsyncProps
>(
  "transactions/fetchIncomesPage",
  async ({ currencyProfile, month, year, search, filters, sort, pageNum }) => {
    return await getTransactionsPage(
      currencyProfile,
      TransactionTypeEnum.Income,
      month,
      year,
      search,
      filters,
      sort,
      pageNum
    );
  }
);

// Fetch Expenses page action
export const fetchExpensesPageAsync = createAsyncThunk<
  Either<AppError, PageEntity<TransactionEntity>>,
  TransactionPageFetchAsyncProps
>(
  "transactions/fetchExpensesPage",
  async ({ currencyProfile, month, year, search, filters, sort, pageNum }) => {
    return await getTransactionsPage(
      currencyProfile,
      TransactionTypeEnum.Expense,
      month,
      year,
      search,
      filters,
      sort,
      pageNum
    );
  }
);

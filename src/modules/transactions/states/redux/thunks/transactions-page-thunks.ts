import { createAsyncThunk } from "@reduxjs/toolkit";
import { TransactionEntity } from "../../../data/entities/transaction-entity";
import { PageEntity } from "../../../../../common/data/entities/page-entity";
import { TransactionTypeEnum } from "../../../data/enums/transaction-type-enum";
import { TransactionFiltersEntity } from "../../../data/entities/transaction-filters-entity";
import { TransactionSortEnum } from "../../../data/enums/transaction-sort-enum";
import { getTransactionsPage } from "../../../usecases/get-transactions-page-usecase";

export interface TransactionPageFetchAsyncProps {
  currencyProfileId: string;
  month: number;
  year: number;
  search: string;
  filters: TransactionFiltersEntity;
  sort: TransactionSortEnum;
  pageNum: number;
}

// Fetch Incomes page action
export const fetchIncomesPageAsync = createAsyncThunk<
  PageEntity<TransactionEntity>,
  TransactionPageFetchAsyncProps
>(
  "transactions/fetchIncomesPage",
  async ({
    currencyProfileId,
    month,
    year,
    search,
    filters,
    sort,
    pageNum,
  }) => {
    return await getTransactionsPage(
      currencyProfileId,
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
  PageEntity<TransactionEntity>,
  TransactionPageFetchAsyncProps
>(
  "transactions/fetchExpensesPage",
  async ({
    currencyProfileId,
    month,
    year,
    search,
    filters,
    sort,
    pageNum,
  }) => {
    return await getTransactionsPage(
      currencyProfileId,
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

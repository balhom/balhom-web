import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransactionEntity } from "../../../data/entities/transaction-entity";
import {
  fetchExpensesPageAsync,
  fetchIncomesPageAsync,
  TransactionPageFetchAsyncProps,
} from "../thunks/transactions-page-thunks";
import { PageEntity } from "../../../../../common/data/entities/page-entity";
import { AppError } from "../../../../../common/data/errors/app-error";
import { TransactionFiltersEntity } from "../../../data/entities/transaction-filters-entity";
import { TransactionSortEnum } from "../../../data/enums/transaction-sort-enum";
import { Either } from "../../../../../common/data/either";

export interface TransactionPageState<T> {
  search: string;
  filter: TransactionFiltersEntity;
  sortValue: TransactionSortEnum;
  page: PageEntity<T>;
  isLoading: boolean;
  error?: AppError;
}

const defaultPage = {
  firstPage: 0,
  lastPage: 0,
  pageNum: 0,
  results: [],
  totalElements: 0,
  pageSize: 10,
};

const initialState: TransactionPageState<TransactionEntity> = {
  search: "",
  filter: {},
  sortValue: TransactionSortEnum.DateDesc,
  page: defaultPage,
  isLoading: false,
};

export const updateTransactionStateInPage = (
  state: TransactionPageState<TransactionEntity>,
  action: PayloadAction<TransactionEntity>
) => {
  if (state.page) {
    const updatedTransaction = action.payload;
    state.page.results = state.page.results.map((t) =>
      t.id === updatedTransaction.id ? updatedTransaction : t
    );
  }
};

export const deleteTransactionStateInPage = (
  state: TransactionPageState<TransactionEntity>,
  action: PayloadAction<string>
) => {
  if (state.page) {
    const transactionId = action.payload;
    state.page.results = state.page.results.filter(
      (t) => t.id !== transactionId
    );
  }
};

const pendingFetchTransactionsPage = (
  state: TransactionPageState<TransactionEntity>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any
) => {
  const args = action.meta.arg as TransactionPageFetchAsyncProps;
  if (args.pageNum !== state.page.pageNum) {
    state.page.results = [];
    state.page.pageNum = args.pageNum;
  }
  state.isLoading = true;
  state.search = args.search;
  state.filter = args.filters;
  state.sortValue = args.sort;
  state.error = undefined;
};

const fulfilledFetchTransactionsPage = (
  state: TransactionPageState<TransactionEntity>,
  action: PayloadAction<Either<AppError, PageEntity<TransactionEntity>>>
) => {
  state.isLoading = false;

  action.payload.fold(
    (error) => {
      state.error = error;
    },
    (payload) => {
      state.error = undefined;
      state.page = payload;
    }
  );
};

export const incomesPageSlice = createSlice({
  name: "incomes",
  initialState,
  reducers: {
    // Update income section
    updateTransactionIncomeInPage: updateTransactionStateInPage,
    // Delete income section
    deleteTransactionIncomeInPage: deleteTransactionStateInPage,
  },
  extraReducers: (builder) => {
    builder
      // Fetch transactions page section
      .addCase(fetchIncomesPageAsync.pending, pendingFetchTransactionsPage)
      .addCase(fetchIncomesPageAsync.fulfilled, fulfilledFetchTransactionsPage);
  },
});

export const expensesPageSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    // Update expense section
    updateTransactionExpenseInPage: updateTransactionStateInPage,
    // Delete expense section
    deleteTransactionExpenseInPage: deleteTransactionStateInPage,
  },
  extraReducers: (builder) => {
    builder
      // Fetch transactions page section
      .addCase(fetchExpensesPageAsync.pending, pendingFetchTransactionsPage)
      .addCase(
        fetchExpensesPageAsync.fulfilled,
        fulfilledFetchTransactionsPage
      );
  },
});

export const { updateTransactionIncomeInPage, deleteTransactionIncomeInPage } =
  incomesPageSlice.actions;

export const {
  updateTransactionExpenseInPage,
  deleteTransactionExpenseInPage,
} = expensesPageSlice.actions;

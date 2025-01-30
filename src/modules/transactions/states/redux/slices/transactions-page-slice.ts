import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransactionEntity } from "../../../data/entities/transaction-entity";
import { fetchTransactionsPageAsync } from "../thunks/transactions-page-thunks";
import { PageEntity } from "../../../../../common/data/entities/page-entity";
import { AppError } from "../../../../../common/data/errors/app-error";
import { TransactionFiltersEntity } from "../../../data/entities/transaction-filters-entity";
import { TransactionSortEnum } from "../../../data/enums/transaction-sort-enum";


export interface TransactionPageState<T> {
  filter: TransactionFiltersEntity;
  sortValue: TransactionSortEnum;
  page?: PageEntity<T>;
  isLoading: boolean;
  error?: AppError;
}

const initialState: TransactionPageState<TransactionEntity> = {
  filter: {},
  sortValue: TransactionSortEnum.DateDesc,
  isLoading: false,
};

const transactionsPageSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    // Update transaction section
    updateTransactionInPage: (
      state,
      action: PayloadAction<TransactionEntity>
    ) => {
      if (state.page) {
        const updatedTransaction = action.payload;
        state.page.results = state.page.results.map((t) =>
          t.id === updatedTransaction.id ? updatedTransaction : t
        );
      }
    },
    // Delete transaction section
    deleteTransactionInPage: (state, action: PayloadAction<string>) => {
      if (state.page) {
        const transactionId = action.payload;
        state.page.results = state.page.results.filter(
          (t) => t.id !== transactionId
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch transactions page section
      .addCase(fetchTransactionsPageAsync.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchTransactionsPageAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error as AppError;
      })
      .addCase(
        fetchTransactionsPageAsync.fulfilled,
        (state, action: PayloadAction<PageEntity<TransactionEntity>>) => {
          state.isLoading = false;
          state.error = undefined;
          state.page = action.payload;
        }
      );
  },
});

export default transactionsPageSlice;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PageState } from "../../../../../common/states/page-state";
import { TransactionEntity } from "../../../data/entities/transaction-entity";
import { fetchTransactionsPageAsync } from "../thunks/transactions-page-thunks";
import { PageEntity } from "../../../../../common/data/entities/page-entity";
import { AppError } from "../../../../../common/data/errors/app-error";

const initialState: PageState<TransactionEntity> = {
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
      if (state.pageEntity) {
        const updatedTransaction = action.payload;
        state.pageEntity.results = state.pageEntity.results.map((t) =>
          t.id === updatedTransaction.id ? updatedTransaction : t
        );
      }
    },
    // Delete transaction section
    deleteTransactionInPage: (state, action: PayloadAction<string>) => {
      if (state.pageEntity) {
        const transactionId = action.payload;
        state.pageEntity.results = state.pageEntity.results.filter(
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
          state.pageEntity = action.payload;
        }
      );
  },
});

export default transactionsPageSlice;

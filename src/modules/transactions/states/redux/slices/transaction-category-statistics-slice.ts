import { createSlice } from "@reduxjs/toolkit";
import { TransactionCategoryStatisticsState } from "../../../data/states/transaction-category-statistics-state";
import { fetchTransactionCategoryStatisticsAsync } from "../thunks/transaction-category-statistics-thunks";

const initialState: TransactionCategoryStatisticsState = {
  categoryStatistics: {
    points: [],
  },
  isStatisticsLoading: true,
};

const transactionCategoryStatisticsSlice = createSlice({
  name: "transactionCategoryStatistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionCategoryStatisticsAsync.pending, (state) => {
        state.isStatisticsLoading = true;
        state.categoryStatistics.points = [];
      })
      .addCase(
        fetchTransactionCategoryStatisticsAsync.fulfilled,
        (state, action) => {
          state.isStatisticsLoading = false;
          state.categoryStatistics = action.payload;
        }
      );
  },
});

export default transactionCategoryStatisticsSlice;

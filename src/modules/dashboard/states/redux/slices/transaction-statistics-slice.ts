import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDailyTransactionStatisticsAsync,
  fetchMonthlyTransactionStatisticsAsync,
} from "../thunks/transaction-statistics-thunks";
import { TransactionStatisticsState } from "../../../data/states/transaction-statistics-state";
import {
  fillDailyTransactionStatisticsPoints,
  fillMonthlyTransactionStatisticsPoints,
} from "../../../utils";

const initialState: TransactionStatisticsState = {
  dailyStatistics: {
    points: fillDailyTransactionStatisticsPoints(
      [],
      new Date().getMonth(),
      new Date().getFullYear()
    ),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  },
  monthlyStatistics: {
    points: fillMonthlyTransactionStatisticsPoints([]),
    year: new Date().getFullYear(),
  },
  isDailyStatisticsLoading: true,
  isMonthlyStatisticsLoading: true,
  selectedMonth: new Date().getMonth(),
  selectedYear: new Date().getFullYear(),
};

const transactionStatisticsSlice = createSlice({
  name: "transactionStatistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchDailyTransactionStatisticsAsync.pending,
        (state, action) => {
          state.isDailyStatisticsLoading = true;
          state.selectedMonth = action.meta.arg.month;
          state.selectedYear = action.meta.arg.year;
          state.dailyStatistics.points = fillDailyTransactionStatisticsPoints(
            [],
            action.meta.arg.month,
            action.meta.arg.year
          );
        }
      )
      .addCase(
        fetchDailyTransactionStatisticsAsync.fulfilled,
        (state, action) => {
          state.isDailyStatisticsLoading = false;
          state.selectedMonth = action.payload.month;
          state.selectedYear = action.payload.year;
          state.dailyStatistics = action.payload;
        }
      )
      .addCase(
        fetchMonthlyTransactionStatisticsAsync.pending,
        (state, action) => {
          state.isMonthlyStatisticsLoading = true;
          state.selectedYear = action.meta.arg.year;
          state.monthlyStatistics.points =
            fillMonthlyTransactionStatisticsPoints([]);
        }
      )
      .addCase(
        fetchMonthlyTransactionStatisticsAsync.fulfilled,
        (state, action) => {
          state.isMonthlyStatisticsLoading = false;
          state.selectedYear = action.payload.year;
          state.monthlyStatistics = action.payload;
        }
      );
  },
});

export default transactionStatisticsSlice;

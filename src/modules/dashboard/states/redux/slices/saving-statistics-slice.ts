import { createSlice } from "@reduxjs/toolkit";
import {
  fillMonthlySavingStatisticsPoints,
  fillYearlySavingStatisticsPoints,
} from "../../../utils";
import { SavingStatisticsState } from "../../../data/states/saving-statistics-state";
import {
  fetchMonthlySavingStatisticsAsync,
  fetchYearlySavingStatisticsAsync,
} from "../thunks/saving-statistics-thunks";

const initialState: SavingStatisticsState = {
  monthlyStatistics: {
    points: fillMonthlySavingStatisticsPoints([]),
    year: new Date().getFullYear(),
  },
  yearlyStatistics: {
    points: fillYearlySavingStatisticsPoints([]),
  },
  isMonthlyStatisticsLoading: true,
  isYearlyStatisticsLoading: true,
  selectedYear: new Date().getFullYear(),
};

const savingStatisticsSlice = createSlice({
  name: "savingStatistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonthlySavingStatisticsAsync.pending, (state, action) => {
        state.isMonthlyStatisticsLoading = true;
        state.selectedYear = action.meta.arg.year;
        state.monthlyStatistics.points = fillMonthlySavingStatisticsPoints([]);
      })
      .addCase(fetchMonthlySavingStatisticsAsync.fulfilled, (state, action) => {
        state.isMonthlyStatisticsLoading = false;
        state.selectedYear = action.payload.year;
        state.monthlyStatistics = action.payload;
      })
      .addCase(fetchYearlySavingStatisticsAsync.pending, (state) => {
        state.isYearlyStatisticsLoading = true;
        state.yearlyStatistics.points = fillYearlySavingStatisticsPoints([]);
      })
      .addCase(fetchYearlySavingStatisticsAsync.fulfilled, (state, action) => {
        state.isYearlyStatisticsLoading = false;
        state.yearlyStatistics = action.payload;
      });
  },
});

export default savingStatisticsSlice;

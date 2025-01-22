import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDailyTransactionStatistics } from "../../../usecases/get-daily-transaction-statistics-usecase";
import { DailyTransactionStatisticsEntity } from "../../../data/entities/daily-transaction-statistics-entity";
import { MonthlyTransactionStatisticsEntity } from "../../../data/entities/monthly-transaction-statistics-entity";
import { getMonthlyTransactionStatistics } from "../../../usecases/get-monthly-transaction-statistics-usecase";

// Fetch daily transaction statistics action
export const fetchDailyTransactionStatisticsAsync = createAsyncThunk<
  DailyTransactionStatisticsEntity,
  { month: number; year: number }
>("statistics/fetchDailyTransactionStatistics", async ({ month, year }) => {
  return await getDailyTransactionStatistics(month, year);
});

// Fetch monthly transaction statistics action
export const fetchMonthlyTransactionStatisticsAsync = createAsyncThunk<
  MonthlyTransactionStatisticsEntity,
  { year: number }
>("statistics/fetchMonthlyTransactionStatistics", async ({ year }) => {
  return await getMonthlyTransactionStatistics(year);
});

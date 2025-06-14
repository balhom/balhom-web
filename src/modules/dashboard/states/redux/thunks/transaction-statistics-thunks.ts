import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDailyTransactionStatistics } from "../../../usecases/get-daily-transaction-statistics-usecase";
import { DailyTransactionStatisticsEntity } from "../../../data/entities/daily-transaction-statistics-entity";
import { MonthlyTransactionStatisticsEntity } from "../../../data/entities/monthly-transaction-statistics-entity";
import { getMonthlyTransactionStatistics } from "../../../usecases/get-monthly-transaction-statistics-usecase";

// Fetch daily transaction statistics action
export const fetchDailyTransactionStatisticsAsync = createAsyncThunk<
  DailyTransactionStatisticsEntity,
  { currencyProfileId: string; month: number; year: number }
>(
  "statistics/fetchDailyTransactionStatistics",
  async ({ currencyProfileId, month, year }) => {
    return await getDailyTransactionStatistics(currencyProfileId, month, year);
  }
);

// Fetch monthly transaction statistics action
export const fetchMonthlyTransactionStatisticsAsync = createAsyncThunk<
  MonthlyTransactionStatisticsEntity,
  { currencyProfileId: string; year: number }
>(
  "statistics/fetchMonthlyTransactionStatistics",
  async ({ currencyProfileId, year }) => {
    return await getMonthlyTransactionStatistics(currencyProfileId, year);
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import { MonthlySavingStatisticsEntity } from "../../../data/entities/monthly-saving-statistics-entity";
import { YearlySavingStatisticsEntity } from "../../../data/entities/yearly-saving-statistics-entity";
import { getYearlySavingStatistics } from "../../../usecases/get-yearly-saving-statistics-usecase";
import { getMonthlySavingStatistics } from "../../../usecases/get-monthly-saving-statistics-usecase";

// Fetch monthly saving statistics action
export const fetchMonthlySavingStatisticsAsync = createAsyncThunk<
  MonthlySavingStatisticsEntity,
  { currencyProfileId: string; year: number }
>(
  "statistics/fetchMonthlySavingStatistics",
  async ({ currencyProfileId, year }) => {
    return await getMonthlySavingStatistics(currencyProfileId, year);
  }
);

// Fetch yearly saving statistics action
export const fetchYearlySavingStatisticsAsync = createAsyncThunk<
  YearlySavingStatisticsEntity,
  { currencyProfileId: string }
>("statistics/fetchYearlySavingStatistics", async ({ currencyProfileId }) => {
  return await getYearlySavingStatistics(currencyProfileId);
});

import { createAsyncThunk } from "@reduxjs/toolkit";
import { TransactionTypeEnum } from "../../../data/enums/transaction-type-enum";
import { getTransactionCategoryStatistics } from "../../../usecases/get-transaction-category-statistics-usecase";
import { TransactionCategoryStatisticsEntity } from "../../../data/entities/transaction-category-statistics-entity";

// Fetch daily transaction statistics action
export const fetchTransactionCategoryStatisticsAsync = createAsyncThunk<
  TransactionCategoryStatisticsEntity,
  { type: TransactionTypeEnum; month: number; year: number }
>(
  "transaction/fetchTransactionCategoryStatistics",
  async ({ type, month, year }) => {
    return await getTransactionCategoryStatistics(type, month, year);
  }
);

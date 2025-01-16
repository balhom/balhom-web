import { createAsyncThunk } from "@reduxjs/toolkit";
import { TransactionEntity } from "../../../data/entities/transaction-entity";
import { PageEntity } from "../../../../../common/data/entities/page-entity";

// Fetch transactions page action
export const fetchTransactionsPageAsync = createAsyncThunk<
  PageEntity<TransactionEntity>,
  { pageNum: number }
>("transactions/fetchTransactionsPage", async ({ pageNum }) => {
  // TODO call get page usecase

  return {
    totalElements: 0,
    pageNum: pageNum,
    firstPage: 0,
    lastPage: 0,
    results: [],
  };
});

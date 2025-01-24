import { configureStore } from "@reduxjs/toolkit";
import transactionsPageSlice from "./modules/transactions/states/redux/slices/transactions-page-slice";
import transactionStatisticsSlice from "./modules/dashboard/states/redux/slices/transaction-statistics-slice";
import savingStatisticsSlice from "./modules/dashboard/states/redux/slices/saving-statistics-slice";
import transactionCategoryStatisticsSlice from "./modules/transactions/states/redux/slices/transaction-category-statistics-slice";

const store = configureStore({
  reducer: {
    transactionStatistics: transactionStatisticsSlice.reducer,
    savingStatistics: savingStatisticsSlice.reducer,
    transactionCategoryStatistics: transactionCategoryStatisticsSlice.reducer,
    transactionsPage: transactionsPageSlice.reducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

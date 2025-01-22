import { configureStore } from "@reduxjs/toolkit";
import transactionsPageSlice from "./modules/transactions/states/redux/slices/transactions-page-slice";
import transactionStatisticsSlice from "./modules/dashboard/states/redux/slices/transaction-statistics-slice";
import savingStatisticsSlice from "./modules/dashboard/states/redux/slices/saving-statistics-slice";

const store = configureStore({
  reducer: {
    transactionsPage: transactionsPageSlice.reducer,
    transactionStatistics: transactionStatisticsSlice.reducer,
    savingStatistics: savingStatisticsSlice.reducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

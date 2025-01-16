import { configureStore } from "@reduxjs/toolkit";
import transactionsPageSlice from "./modules/transactions/states/redux/slices/transactions-page-slice";

const store = configureStore({
  reducer: {
    transactionsPage: transactionsPageSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type TransactionsAppDispatch = typeof store.dispatch;

export default store;

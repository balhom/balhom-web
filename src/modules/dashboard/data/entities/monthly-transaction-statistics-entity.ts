export interface MonthlyTransactionStatisticsEntity {
  points: MonthlyTransactionPointEntity[];
  year: number;
}

export interface MonthlyTransactionPointEntity {
  income: number;
  expenses: number;
  month: number;
}

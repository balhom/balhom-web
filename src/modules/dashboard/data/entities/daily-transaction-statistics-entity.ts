export interface DailyTransactionStatisticsEntity {
  points: DailyTransactionPointEntity[];
  month: number;
  year: number;
}

export interface DailyTransactionPointEntity {
  income: number;
  expenses: number;
  day: number;
}

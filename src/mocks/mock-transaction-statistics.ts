import { DailyTransactionPointEntity } from "../modules/dashboard/data/entities/daily-transaction-statistics-entity";
import { MonthlyTransactionPointEntity } from "../modules/dashboard/data/entities/monthly-transaction-statistics-entity";

export const mockDailyTransactionStatisticsPoints: DailyTransactionPointEntity[] =
  [
    {
      income: Math.floor(Math.random() * 5000),
      expenses: Math.floor(Math.random() * 5000),
      day: 1,
    },
    {
      income: Math.floor(Math.random() * 5000),
      expenses: Math.floor(Math.random() * 5000),
      day: 3,
    },
    {
      income: Math.floor(Math.random() * 5000),
      expenses: Math.floor(Math.random() * 5000),
      day: 10,
    },
    {
      income: Math.floor(Math.random() * 5000),
      expenses: Math.floor(Math.random() * 5000),
      day: 12,
    },
    {
      income: Math.floor(Math.random() * 5000),
      expenses: Math.floor(Math.random() * 5000),
      day: 15,
    },
    {
      income: Math.floor(Math.random() * 5000),
      expenses: Math.floor(Math.random() * 5000),
      day: 20,
    },
    {
      income: Math.floor(Math.random() * 5000),
      expenses: Math.floor(Math.random() * 5000),
      day: 21,
    },
    {
      income: Math.floor(Math.random() * 5000),
      expenses: Math.floor(Math.random() * 5000),
      day: 23,
    },
    {
      income: Math.floor(Math.random() * 5000),
      expenses: Math.floor(Math.random() * 5000),
      day: 24,
    },
    {
      income: Math.floor(Math.random() * 5000),
      expenses: Math.floor(Math.random() * 5000),
      day: 27,
    },
    {
      income: Math.floor(Math.random() * 5000),
      expenses: Math.floor(Math.random() * 5000),
      day: 28,
    },
  ];

export const mockMonthlyTransactionStatisticsPoints: MonthlyTransactionPointEntity[] =
  [
    {
      income: Math.floor(Math.random() * 5000),
      expenses: Math.floor(Math.random() * 5000),
      month: 1,
    },
    {
      income: Math.floor(Math.random() * 5000),
      expenses: Math.floor(Math.random() * 5000),
      month: 2,
    },
    {
      income: Math.floor(Math.random() * 5000),
      expenses: Math.floor(Math.random() * 5000),
      month: 2,
    },
    {
      income: Math.floor(Math.random() * 5000),
      expenses: Math.floor(Math.random() * 5000),
      month: 4,
    },
    {
      income: Math.floor(Math.random() * 5000),
      expenses: Math.floor(Math.random() * 5000),
      month: 5,
    },
    {
      income: Math.floor(Math.random() * 5000),
      expenses: Math.floor(Math.random() * 5000),
      month: 6,
    },
    {
      income: Math.floor(Math.random() * 5000),
      expenses: Math.floor(Math.random() * 5000),
      month: 7,
    },
    {
      income: Math.floor(Math.random() * 5000),
      expenses: Math.floor(Math.random() * 5000),
      month: 8,
    },
    {
      income: Math.floor(Math.random() * 5000),
      expenses: Math.floor(Math.random() * 5000),
      month: 10,
    },
    {
      income: Math.floor(Math.random() * 5000),
      expenses: Math.floor(Math.random() * 5000),
      month: 11,
    },
    {
      income: Math.floor(Math.random() * 5000),
      expenses: Math.floor(Math.random() * 5000),
      month: 12,
    },
  ];

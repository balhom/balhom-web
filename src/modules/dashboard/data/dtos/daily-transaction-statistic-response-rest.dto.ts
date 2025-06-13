import { DailyTransactionPointEntity } from "../entities/daily-transaction-statistics-entity";

export interface DailyTransactionStatisticResponseRestDto {
  currencyProfileId: string;
  day: number;
  month: number;
  year: number;
  income: number;
  expenses: number;
}

export function dailyTransactionStatisticResponseRestDtoToEntity(
  response: DailyTransactionStatisticResponseRestDto
): DailyTransactionPointEntity {
  return {
    income: response.income,
    expenses: response.expenses,
    day: response.day,
  };
}

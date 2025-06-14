import { MonthlyTransactionPointEntity } from "../entities/monthly-transaction-statistics-entity";

export interface MonthlyTransactionStatisticResponseRestDto {
  currencyProfileId: string;
  month: number;
  year: number;
  income: number;
  expenses: number;
}

export function monthlyTransactionStatisticResponseRestDtoToEntity(
  response: MonthlyTransactionStatisticResponseRestDto
): MonthlyTransactionPointEntity {
  return {
    income: response.income,
    expenses: response.expenses,
    month: response.month,
  };
}

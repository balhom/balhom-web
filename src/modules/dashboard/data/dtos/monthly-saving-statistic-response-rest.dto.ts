import { MonthlySavingPointEntity } from "../entities/monthly-saving-statistics-entity";

export interface MonthlySavingStatisticResponseRestDto {
  currencyProfileId: string;
  month: number;
  year: number;
  savings: number;
  goal: number;
}

export function monthlySavingStatisticResponseRestDtoToEntity(
  response: MonthlySavingStatisticResponseRestDto
): MonthlySavingPointEntity {
  return {
    saving: response.savings,
    goal: response.goal,
    month: response.month,
  };
}

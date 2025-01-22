export interface MonthlySavingStatisticsEntity {
  points: MonthlySavingPointEntity[];
  year: number;
}

export interface MonthlySavingPointEntity {
  saving: number;
  goal: number;
  month: number;
}

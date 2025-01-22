export interface YearlySavingStatisticsEntity {
  points: YearlySavingPointEntity[];
}

export interface YearlySavingPointEntity {
  saving: number;
  goal: number;
  year: number;
}

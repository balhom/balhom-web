import { MonthlySavingPointEntity } from "../modules/dashboard/data/entities/monthly-saving-statistics-entity";
import { YearlySavingPointEntity } from "../modules/dashboard/data/entities/yearly-saving-statistics-entity";

export const mockMonthlySavingStatisticsPoints: MonthlySavingPointEntity[] = [
  {
    saving: Math.floor(Math.random() * 5000),
    goal: 5000,
    month: 1,
  },
  {
    saving: Math.floor(Math.random() * 5000),
    goal: 5000,
    month: 2,
  },
  {
    saving: Math.floor(Math.random() * 5000),
    goal: 5000,
    month: 2,
  },
  {
    saving: Math.floor(Math.random() * 5000),
    goal: 5000,
    month: 4,
  },
  {
    saving: Math.floor(Math.random() * 5000),
    goal: 5000,
    month: 5,
  },
  {
    saving: Math.floor(Math.random() * 5000),
    goal: 5000,
    month: 6,
  },
  {
    saving: Math.floor(Math.random() * 5000),
    goal: 5000,
    month: 7,
  },
  {
    saving: Math.floor(Math.random() * 5000),
    goal: 8000,
    month: 8,
  },
  {
    saving: Math.floor(Math.random() * 5000),
    goal: 8000,
    month: 10,
  },
  {
    saving: Math.floor(Math.random() * 5000),
    goal: 8000,
    month: 11,
  },
  {
    saving: Math.floor(Math.random() * 5000),
    goal: 8000,
    month: 12,
  },
];

export const mockYearlySavingStatisticsPoints: YearlySavingPointEntity[] = [
  {
    saving: Math.floor(Math.random() * 5000),
    goal: 5000,
    year: 2021,
  },
  {
    saving: Math.floor(Math.random() * 5000),
    goal: 5000,
    year: 2022,
  },
  {
    saving: Math.floor(Math.random() * 5000),
    goal: 5000,
    year: 2023,
  },
  {
    saving: Math.floor(Math.random() * 5000),
    goal: 5000,
    year: 2024,
  },
  {
    saving: Math.floor(Math.random() * 5000),
    goal: 5000,
    year: 2025,
  },
];

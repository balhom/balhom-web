import { DailyTransactionPointEntity } from "./data/entities/daily-transaction-statistics-entity";
import { MonthlyTransactionPointEntity } from "./data/entities/monthly-transaction-statistics-entity";
import { MonthlySavingPointEntity } from "./data/entities/monthly-saving-statistics-entity";
import { YearlySavingPointEntity } from "./data/entities/yearly-saving-statistics-entity";
import { getDaysInMonth, getYearsBetweenDates } from "../../common/utils/date-utils";

export function fillDailyTransactionStatisticsPoints(
  statisticsPoints: DailyTransactionPointEntity[],
  month: number,
  year: number
): DailyTransactionPointEntity[] {
  const days: number[] = getDaysInMonth(month, year);
  const points: DailyTransactionPointEntity[] = [];

  days.forEach((day) => {
    const point = statisticsPoints.find((p) => p.day == day);
    if (point) {
      points.push(point);
    } else {
      points.push({
        day: day,
        expenses: 0,
        income: 0,
      });
    }
  });

  return points;
}

export function fillMonthlyTransactionStatisticsPoints(
  statisticsPoints: MonthlyTransactionPointEntity[]
): MonthlyTransactionPointEntity[] {
  const months: number[] = [...Array(12)].map((_, i) => i + 1);
  const points: MonthlyTransactionPointEntity[] = [];

  months.forEach((month) => {
    const point = statisticsPoints.find((p) => p.month == month);
    if (point) {
      points.push(point);
    } else {
      points.push({
        month: month,
        expenses: 0,
        income: 0,
      });
    }
  });

  return points;
}

export function fillMonthlySavingStatisticsPoints(
  statisticsPoints: MonthlySavingPointEntity[]
): MonthlySavingPointEntity[] {
  const months: number[] = [...Array(12)].map((_, i) => i + 1);
  const points: MonthlySavingPointEntity[] = [];

  months.forEach((month) => {
    const point = statisticsPoints.find((p) => p.month == month);
    if (point) {
      points.push(point);
    } else {
      points.push({
        month: month,
        goal: 0,
        saving: 0,
      });
    }
  });

  return points;
}

export function fillYearlySavingStatisticsPoints(
  statisticsPoints: YearlySavingPointEntity[]
): YearlySavingPointEntity[] {
  const years: number[] = getYearsBetweenDates(
    new Date(new Date().getFullYear() - 8, 1),
    new Date()
  );
  const points: YearlySavingPointEntity[] = [];

  years.forEach((year) => {
    const point = statisticsPoints.find((p) => p.year == year);
    if (point) {
      points.push(point);
    } else {
      points.push({
        year: year,
        goal: 0,
        saving: 0,
      });
    }
  });

  return points;
}

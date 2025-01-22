import { TFunction } from "i18next";
import { DailyTransactionPointEntity } from "./data/entities/daily-transaction-statistics-entity";
import { MonthlyTransactionPointEntity } from "./data/entities/monthly-transaction-statistics-entity";

export function formatMonth(
  month: number,
  t: TFunction<"translation", undefined>
): string {
  switch (month) {
    case 1:
      return t("months.jan");
    case 2:
      return t("months.feb");
    case 3:
      return t("months.mar");
    case 4:
      return t("months.apr");
    case 5:
      return t("months.may");
    case 6:
      return t("months.jun");
    case 7:
      return t("months.jul");
    case 8:
      return t("months.aug");
    case 9:
      return t("months.sep");
    case 10:
      return t("months.oct");
    case 11:
      return t("months.nov");
    case 12:
      return t("months.dec");
    default:
      return t("months.jan");
  }
}

export function getYearsBetweenDates(startDate: Date, endDate: Date): number[] {
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  const years: number[] = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }

  return years;
}

export function getDaysInMonth(month: number, year: number): number[] {
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
}

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

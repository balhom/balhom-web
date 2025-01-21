import { CurrencyEnum } from "../enums/currency-enum";

export interface CurrencyProfileEntity {
  id: string;
  name: string;
  imageUrl?: string;
  currency: CurrencyEnum;
  balance?: number;
  monthlySavingsGoal?: number;
  yearlySavingsGoal?: number;
}

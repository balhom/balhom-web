import { CurrencyEnum } from "../enums/currency-enum";

export interface CurrencyProfileEntity {
  id: string;
  name: string;
  imageUrl?: string;
  currency: CurrencyEnum;
  balance: number;
  initialDate: Date;
  monthlySavingsGoal?: number;
  yearlySavingsGoal?: number;
  createdAt?: Date;
}

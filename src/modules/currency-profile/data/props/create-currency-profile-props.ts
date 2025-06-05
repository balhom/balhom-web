import { CurrencyEnum } from "../enums/currency-enum";

export interface CreateCurrencyProfileProps {
  name: string;
  currency: CurrencyEnum;
  balance: number;
  initialDate: Date;
  monthlySavingsGoal: number;
  yearlySavingsGoal: number;
  image?: File;
}

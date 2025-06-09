export interface UpdateCurrencyProfileProps {
  name: string;
  balance: number;
  initialDate: Date;
  monthlySavingsGoal: number;
  yearlySavingsGoal: number;
  image?: File;
}

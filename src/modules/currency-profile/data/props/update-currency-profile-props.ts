export interface UpdateCurrencyProfileProps {
  id: string;
  name: string;
  balance: number;
  initialDate: Date;
  monthlySavingsGoal: number;
  yearlySavingsGoal: number;
  image?: File;
}

export type Currency = 'EUR' | 'USD' | 'CAD';

export interface CurrencyProfile {
  id: string;
  userId: string;
  name: string;
  imageUrl?: string;
  currency: Currency;
  balance?: number;
  monthlySavingsGoal?: number;
  yearlySavingsGoal?: number;
  createdAt: string;
}

export interface CreateCurrencyProfileData {
  name: string;
  imageUrl?: string;
  currency: Currency;
  monthlySavingsGoal: number;
  yearlySavingsGoal: number;
}
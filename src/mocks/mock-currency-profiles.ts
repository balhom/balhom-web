import { CurrencyProfileEntity } from "../modules/currency-profile/data/entities/currency-profile-entity";
import { CurrencyEnum } from "../modules/currency-profile/data/enums/currency-enum";

export const mockCurrencyProfiles: CurrencyProfileEntity[] = [
  {
    id: "1",
    name: "Personal Cash",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e",
    currency: CurrencyEnum.EUR,
    balance: 5420.5,
    initialDate: new Date(2010, 10, 0),
    monthlySavingsGoal: 1000,
    yearlySavingsGoal: 2000,
    createdAt: new Date(2010, 10, 0),
  },
  {
    id: "2",
    name: "Travel Savings",
    currency: CurrencyEnum.USD,
    balance: 2150.75,
    initialDate: new Date(2010, 10, 0),
    monthlySavingsGoal: 1000,
    yearlySavingsGoal: 2000,
  },
  {
    id: "3",
    name: "Emergency Fund",
    imageUrl: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6",
    currency: CurrencyEnum.CAD,
    balance: 10000,
    initialDate: new Date(2010, 10, 0),
    monthlySavingsGoal: 1000,
    yearlySavingsGoal: 2000,
  },
];

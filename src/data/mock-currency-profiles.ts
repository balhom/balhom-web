import type { CurrencyProfile } from '../types/currency-profile';

export const mockCurrencyProfiles: CurrencyProfile[] = [
  {
    id: '1',
    userId: '1',
    name: 'Personal Cash',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e',
    currency: 'EUR',
    balance: 5420.50,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    userId: '1',
    name: 'Travel Savings',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05',
    currency: 'USD',
    balance: 2150.75,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    userId: '1',
    name: 'Emergency Fund',
    imageUrl: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6',
    currency: 'EUR',
    balance: 10000,
    createdAt: new Date().toISOString()
  }
];
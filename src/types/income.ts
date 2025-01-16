export type IncomeCategory = 'bizum' | 'salary' | 'gift' | 'deposit' | 'other';

export interface Income {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: string;
  category: IncomeCategory;
}

export interface IncomeCategoryInfo {
  name: string;
  image: string;
}

export const INCOME_CATEGORIES: Record<IncomeCategory, IncomeCategoryInfo> = {
  bizum: {
    name: 'Bizum',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d'
  },
  salary: {
    name: 'Salary',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e'
  },
  gift: {
    name: 'Gift',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48'
  },
  deposit: {
    name: 'Deposit',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e'
  },
  other: {
    name: 'Other',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f'
  }
};
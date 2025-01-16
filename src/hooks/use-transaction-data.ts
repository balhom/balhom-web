import { useState, useEffect } from 'react';
import type { DailyTransaction, MonthlyTransaction } from '../types/transactions';

// Mock data generator for daily transactions
function generateDailyData(month: Date): DailyTransaction[] {
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    income: Math.floor(Math.random() * 500) + 100,
    expenses: Math.floor(Math.random() * 300) + 50
  }));
}

// Mock data generator for monthly transactions
function generateMonthlyData(year: number): MonthlyTransaction[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    income: Math.floor(Math.random() * 5000) + 1000,
    expenses: Math.floor(Math.random() * 3000) + 500
  }));
}

export function useTransactionData(selectedMonth: Date, selectedYear: number) {
  const [dailyData, setDailyData] = useState<DailyTransaction[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyTransaction[]>([]);

  useEffect(() => {
    setDailyData(generateDailyData(selectedMonth));
  }, [selectedMonth]);

  useEffect(() => {
    setMonthlyData(generateMonthlyData(selectedYear));
  }, [selectedYear]);

  return { dailyData, monthlyData };
}
import { useState, useEffect } from 'react';
import type { MonthlySavings, YearlySavings } from '../types/savings';

// Mock data generator for monthly savings
function generateMonthlyData(year: number): MonthlySavings[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    savings: Math.floor(Math.random() * 5000) + 1000,
    expectedSavings: Math.floor(Math.random() * 4000) + 2000 // Random expected savings between 2000-6000
  }));
}

// Mock data generator for yearly savings
function generateYearlyData(): YearlySavings[] {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 8 }, (_, i) => ({
    year: currentYear - 7 + i,
    savings: Math.floor(Math.random() * 50000) + 10000,
    expectedSavings: Math.floor(Math.random() * 40000) + 20000 // Random expected savings between 20000-60000
  }));
}

export function useSavingsData(selectedYear: number, monthlyGoal: number, yearlyGoal: number) {
  const [monthlyData, setMonthlyData] = useState<MonthlySavings[]>([]);
  const [yearlyData, setYearlyData] = useState<YearlySavings[]>([]);

  useEffect(() => {
    setMonthlyData(generateMonthlyData(selectedYear));
  }, [selectedYear]);

  useEffect(() => {
    setYearlyData(generateYearlyData());
  }, []);

  return { monthlyData, yearlyData };
}
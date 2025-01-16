import { useState } from 'react';
import type { Income } from '../../../types/income';
import IncomeCard from '../income-card/income-card';
import FilterButton from '../filters/filter-button';
import FilterDialog from '../filters/filter-dialog';
import IncomeSort from '../income-sort/income-sort';
import Pagination from '../pagination/pagination';
import './income-list.css';

interface IncomeListProps {
  incomes: Income[];
  currency: string;
}

const ITEMS_PER_PAGE = 10;

const IncomeList = ({ incomes, currency }: IncomeListProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [sortValue, setSortValue] = useState('date-desc');
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id: string) => {
    // Will be implemented later
    console.log('Delete income:', id);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (minAmount) count++;
    if (maxAmount) count++;
    if (startDate) count++;
    if (endDate) count++;
    return count;
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const filteredIncomes = incomes
    .filter(income => {
      if (minAmount && income.amount < Number(minAmount)) return false;
      if (maxAmount && income.amount > Number(maxAmount)) return false;
      if (startDate && new Date(income.date) < startDate) return false;
      if (endDate && new Date(income.date) > endDate) return false;
      return true;
    })
    .sort((a, b) => {
      const [field, order] = sortValue.split('-');
      const multiplier = order === 'asc' ? 1 : -1;

      switch (field) {
        case 'date':
          return multiplier * (new Date(a.date).getTime() - new Date(b.date).getTime());
        case 'amount':
          return multiplier * (a.amount - b.amount);
        case 'title':
          return multiplier * a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredIncomes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedIncomes = filteredIncomes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="income-list">
      <div className="income-list-header">
        <FilterButton 
          isOpen={isFilterOpen}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          activeFiltersCount={getActiveFiltersCount()}
        />
        <IncomeSort
          value={sortValue}
          onChange={(value) => {
            setSortValue(value);
            handleFilterChange();
          }}
        />
      </div>

      <FilterDialog
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        minAmount={minAmount}
        maxAmount={maxAmount}
        startDate={startDate}
        endDate={endDate}
        onMinAmountChange={setMinAmount}
        onMaxAmountChange={setMaxAmount}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onClearFilters={() => {
          setMinAmount('');
          setMaxAmount('');
          setStartDate(null);
          setEndDate(null);
          handleFilterChange();
        }}
        onApplyFilters={handleFilterChange}
      />
      
      <div className="income-cards">
        {paginatedIncomes.map(income => (
          <IncomeCard
            key={income.id}
            income={income}
            currency={currency}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <div className="income-list-footer">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default IncomeList;
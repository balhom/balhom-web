import './transaction-list.css';
import { useState } from 'react';
import FilterButton from '../filters/filter-button';
import FilterDialog from '../filters/filter-dialog';
import IncomeSort from '../income-sort/income-sort';
import Pagination from '../../../../common/components/pagination/pagination';
import TransactionCard from '../transaction-card/transaction-card';

const TransactionList: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // TODO use TransactionPageState

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

  return (
    <div className="transaction-list">
      <div className="transaction-list-header">
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

      <div className="transaction-list-cards">
        {paginatedIncomes.map(transaction => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
          />
        ))}
      </div>

      <div className="transaction-list-footer">
        <Pagination
          page={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default TransactionList;
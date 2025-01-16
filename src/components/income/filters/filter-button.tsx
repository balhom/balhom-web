import { useState } from 'react';
import { Filter } from 'lucide-react';
import './filter-button.css';

interface FilterButtonProps {
  isOpen: boolean;
  onClick: () => void;
  activeFiltersCount?: number;
}

const FilterButton = ({ isOpen, onClick, activeFiltersCount = 0 }: FilterButtonProps) => {
  return (
    <button 
      className={`filter-button ${isOpen ? 'active' : ''}`}
      onClick={onClick}
      aria-expanded={isOpen}
    >
      <Filter size={20} />
      <span>Filters</span>
      {activeFiltersCount > 0 && (
        <span className="filter-count">{activeFiltersCount}</span>
      )}
    </button>
  );
};

export default FilterButton;
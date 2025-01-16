import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { INCOME_CATEGORIES, type IncomeCategory } from '../../../types/income';
import './category-select.css';

interface CategorySelectProps {
  value: IncomeCategory;
  onChange: (value: IncomeCategory) => void;
  required?: boolean;
}

const CategorySelect = ({
  value,
  onChange,
  required = false
}: CategorySelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedCategory = INCOME_CATEGORIES[value];

  return (
    <div className="category-select" ref={dropdownRef}>
      <button
        type="button"
        className="category-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-required={required}
      >
        <img
          src={selectedCategory.image}
          alt={selectedCategory.name}
          className="category-trigger-image"
        />
        {selectedCategory.name}
        <ChevronDown 
          size={20} 
          className={`category-trigger-arrow ${isOpen ? 'open' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="category-dropdown">
          {Object.entries(INCOME_CATEGORIES).map(([key, category]) => (
            <div
              key={key}
              className={`category-option ${key === value ? 'selected' : ''}`}
              onClick={() => {
                onChange(key as IncomeCategory);
                setIsOpen(false);
              }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="category-option-image"
              />
              <span className="category-option-text">{category.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelect;
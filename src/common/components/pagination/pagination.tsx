import "./pagination.css";
import { PageEntity } from "../../data/entities/page-entity";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TransactionTypeEnum } from "../../../modules/transactions/data/enums/transaction-type-enum";

interface Props<T> {
  type: TransactionTypeEnum;
  page: PageEntity<T>;
  onPageChange: (page: number) => void;
}

const Pagination = <T,>({ type, page, onPageChange }: Props<T>) => {
  const currentPage = page.pageNum;
  const totalPages = page.lastPage + 1;

  const getPageNumbers = () => {
    const pages = [];
    const showPages = 3;

    // Always show current page
    pages.push(currentPage + 1);

    // Add up to a max number of pages before current
    for (let i = 1; i <= showPages / 2; i++) {
      if (currentPage + 1 - i > 0) {
        pages.unshift(currentPage + 1 - i);
      }
    }

    // Add up to a max number of pages after current
    for (let i = 1; i <= showPages / 2; i++) {
      if (currentPage + 1 + i <= totalPages) {
        pages.push(currentPage + 1 + i);
      }
    }

    // If we have less than showPages, add more pages to the start or end
    while (pages.length < showPages && pages.length < totalPages) {
      if (pages[0] > 1) {
        pages.unshift(pages[0] - 1);
      } else if (pages[pages.length - 1] < totalPages) {
        pages.push(pages[pages.length - 1] + 1);
      }
    }

    return pages;
  };

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage + 1 === 1}
      >
        <ChevronLeft size={16} />
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          className={`pagination-button ${
            page === currentPage + 1
              ? `active ${type.toLowerCase()}-background-and-border`
              : ""
          }`}
          onClick={() => onPageChange(page - 1)}
        >
          {page}
        </button>
      ))}

      <button
        className={"pagination-button"}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage + 1 >= totalPages}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;

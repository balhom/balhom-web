import { useTranslation } from 'react-i18next';
import './pagination.css';
import { PageEntity } from '../../data/entities/page-entity';

interface Props<T> {
  page: PageEntity<T>;
  onPageChange: (page: number) => void;
}

const Pagination = <T,>({ page, onPageChange }: Props<T>) => {
  const { t } = useTranslation();

  const currentPage = page.pageNum + 1;
  const totalPages = page.lastPage + 1;

  const getPageNumbers = () => {
    const pages = [];
    const showPages = 3;

    // Always show current page
    pages.push(currentPage);

    // Add up to a max number of pages before current
    for (let i = 1; i <= showPages / 2; i++) {
      if (currentPage - i > 0) {
        pages.unshift(currentPage - i);
      }
    }

    // Add up to a max number of pages after current
    for (let i = 1; i <= showPages / 2; i++) {
      if (currentPage + i <= totalPages) {
        pages.push(currentPage + i);
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
        disabled={currentPage === 1}
      >
        {t("common.previous")}
      </button>

      {getPageNumbers().map(page => (
        <button
          key={page}
          className={`pagination-button ${page === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        {t("common.next")}
      </button>
    </div>
  );
};

export default Pagination;
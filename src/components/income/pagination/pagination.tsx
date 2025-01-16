import './pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
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
        className="page-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      
      {getPageNumbers().map(page => (
        <button
          key={page}
          className={`page-button ${page === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      
      <button
        className="page-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
import "./Pagination.css";

function Pagination({ currentPage, totalPages, onPrevious, onNext }) {
  return (
    <div className="paginationContainer">
      <div className="paginationButtons">
        <button 
          className="pageButton" 
          onClick={onPrevious} 
          disabled={currentPage === 1}
        >
          ANT
        </button>
        
        <button 
          className="pageButton" 
          onClick={onNext} 
          disabled={currentPage === totalPages}
        >
          SIG
        </button>
      </div>
    </div>
  );
}

export default Pagination;
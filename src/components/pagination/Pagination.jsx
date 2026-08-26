import "./Pagination.css";

function Pagination({ currentPage, totalPages, currentCount, totalCount, onPrevious, onNext }) {
  return (
    <div className="paginationContainer">
      <span className="paginationInfo">
        Mostrando {currentCount} registros de {totalCount}
      </span>
      
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
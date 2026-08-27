import './VitrinaPagination.css';

function VitrinaPagination({ page, totalPages, onPageChange }) {
  const windowSize = 5;

  let start = Math.max(1, page - Math.floor(windowSize / 2));
  const end = Math.min(totalPages, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);

  const pages = [];
  for (let i = start; i <= end; i += 1) pages.push(i);

  return (
    <div className="vitrinaPagination">
      <button
        className="vitrinaPageBtn"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Página anterior"
      >
        &lt;
      </button>

      {start > 1 && <span className="vitrinaPageEllipsis">…</span>}

      {pages.map((num) => (
        <button
          key={num}
          className={`vitrinaPageBtn${num === page ? ' vitrinaPageBtn--active' : ''}`}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}

      {end < totalPages && <span className="vitrinaPageEllipsis">…</span>}

      <button
        className="vitrinaPageBtn"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Página siguiente"
      >
        &gt;
      </button>
    </div>
  );
}

export default VitrinaPagination;
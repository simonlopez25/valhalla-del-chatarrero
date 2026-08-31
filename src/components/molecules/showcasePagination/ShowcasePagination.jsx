import './ShowcasePagination.css';

function ShowcasePagination({ page, totalPages, onPageChange }) {
  const windowSize = 5;

  let start = Math.max(1, page - Math.floor(windowSize / 2));
  const end = Math.min(totalPages, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);

  const pages = [];
  for (let i = start; i <= end; i += 1) pages.push(i);

  return (
    <div className="showcasePagination">
      <button
        className="showcasePageBtn"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Página anterior"
      >
        &lt;
      </button>

      {start > 1 && <span className="showcasePageEllipsis">…</span>}

      {pages.map((num) => (
        <button
          key={num}
          className={`showcasePageBtn${num === page ? ' showcasePageBtn--active' : ''}`}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}

      {end < totalPages && <span className="showcasePageEllipsis">…</span>}

      <button
        className="showcasePageBtn"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Página siguiente"
      >
        &gt;
      </button>
    </div>
  );
}

export default ShowcasePagination;
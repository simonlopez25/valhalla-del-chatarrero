import "./ViewButton.css";

function ViewButton() {
  const handleClick = () => {
    alert("Sujeto no identificado");
  };

  return (
    <button
      className="actionButton viewButton"
      onClick={handleClick}
      title="Sujeto no identificado"
      type="button"
    >
      <svg
        className="actionIcon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLineCap="round"
        strokeLineJoin="round"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </button>
  );
}

export default ViewButton;
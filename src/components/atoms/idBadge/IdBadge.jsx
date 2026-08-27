import "./IdBadge.css";

function IdBadge({ id }) {
  return (
    <div className="idBadge">
      <span className="idBadgeText">ID: {id}</span>
      <span className="idBadgeDot" />
    </div>
  );
}

export default IdBadge;
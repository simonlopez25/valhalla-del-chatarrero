import './StatusBadge.css';

function StatusBadge({ status, icon }) {
  // Si el texto que viene en status ya incluye "ESTADO:", lo mostramos directamente
  const displayText = status.startsWith('ESTADO:') ? status : `ESTADO: ${status}`;

  return (
    <div className="statusBadge">
      <span className="statusBadgeText">{displayText}</span>
      <span className="statusBadgeIcon">{icon}</span>
    </div>
  );
}

export default StatusBadge;
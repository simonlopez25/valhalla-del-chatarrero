import './Select.css';

export default function Select({ label, name, value, onChange, options, error, id }) {
  return (
    <label className="atom-select" htmlFor={id || name}>
      <span className="atom-selectLabel">{label}</span>
      <select
        id={id || name}
        className="atom-selectField"
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="">Seleccionar...</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <span className="atom-selectError">{error}</span>}
    </label>
  );
}

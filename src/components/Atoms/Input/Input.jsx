import './Input.css';

export default function Input({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  placeholder,
  id,
}) {
  return (
    <label className="atom-input" htmlFor={id || name}>
      <span className="atom-inputLabel">{label}</span>
      <input
        id={id || name}
        className="atom-inputField"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <span className="atom-inputError">{error}</span>}
    </label>
  );
}

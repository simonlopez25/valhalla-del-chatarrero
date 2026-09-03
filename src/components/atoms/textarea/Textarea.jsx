import './Textarea.css';

export default function Textarea({ label, name, value, onChange, error, placeholder, id }) {
  return (
    <label className="atom-textarea" htmlFor={id || name}>
      <span className="atom-textareaLabel">{label}</span>
      <textarea
        id={id || name}
        className="atom-textareaField"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <span className="atom-textareaError">{error}</span>}
    </label>
  );
}

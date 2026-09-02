export const CustomInput = ({
    id,
    type,
    name,
    value,
    placeholder,
    onChange,
    disabled,
    "aria-invalid": ariaInvalid,
}) => {
    return (
        <input
            id={id}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            aria-invalid={ariaInvalid}
            className="customInput"
        />
    );
};
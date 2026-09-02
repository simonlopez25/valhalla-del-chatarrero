import { CustomInput } from "../../atoms/customInput/CustomInput";

export const FormField = ({
    id,
    labelText,
    type,
    name,
    value,
    placeholder,
    onChange,
    options,
    disabled,
    error,
}) => {
    return (
        <div className="formField">
            <label htmlFor={id}>{labelText}</label>
            {type === "select" ? (
                <select
                    id={id}
                    className="customInput"
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    aria-invalid={Boolean(error)}
                >
                    {options?.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <CustomInput
                    id={id}
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    disabled={disabled}
                    aria-invalid={Boolean(error)}
                />
            )}
            {error && <span className="fieldError">{error}</span>}
        </div>
    );
};
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
    rows,
    disabled,
    error,
}) => {
    const selectOptions = options?.map((option) => {
        const isObjectOption = typeof option === "object" && option !== null;
        return {
            value: isObjectOption ? option.value : option,
            label: isObjectOption ? option.label : option,
        };
    });

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
                    {selectOptions?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : type === "textarea" ? (
                <textarea
                    id={id}
                    className="customInput"
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    disabled={disabled}
                    rows={rows}
                    aria-invalid={Boolean(error)}
                />
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
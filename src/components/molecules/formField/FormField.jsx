import { CustomInput } from "../../atoms/customInput/CustomInput";

export const FormField = ({ labelText, type, name, value, placeholder, onChange }) => {
    return (
        <div className="formField">
            <label>{labelText}</label>
            <CustomInput
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
};
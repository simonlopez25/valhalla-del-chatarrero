export const CustomButton = ({ label, type = "submit", onClick, disabled }) => {
    return (
        <button type={type} onClick={onClick} className="customButton" disabled={disabled}>
            {label}
        </button>
    );
};
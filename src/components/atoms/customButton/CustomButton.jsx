export const CustomButton = ({ label, type = "submit", onClick }) => {
    return (
        <button type={type} onClick={onClick} className="customButton">
            {label}
        </button>
    );
};
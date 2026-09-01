export const CustomModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <button onClick={onClose} style={closeButtonStyle}>
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
};

const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
};

const modalContentStyle = {
    backgroundColor: "#1e1e1e",
    color: "#ffffff",
    padding: "30px",
    borderRadius: "8px",
    position: "relative",
    minWidth: "350px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
};

const closeButtonStyle = {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "none",
    border: "none",
    color: "#ffffff",
    fontSize: "18px",
    cursor: "pointer",
};
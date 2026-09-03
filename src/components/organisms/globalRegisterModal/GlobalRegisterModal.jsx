import { useState, useEffect } from "react";
import { CustomModal } from "../../molecules/customModal/CustomModal";
import { RegisterForm } from "../registerForm/RegisterForm";

export function GlobalRegisterModal({ isOpen: propIsOpen, onClose: propOnClose, children }) {
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = propIsOpen !== undefined;
    const isOpen = isControlled ? propIsOpen : internalOpen;
    const handleClose = propOnClose || (() => setInternalOpen(false));

    useEffect(() => {
        if (isControlled) return;
        const handleGlobalClick = (e) => {
            const button = e.target.closest("button");
            if (button && (button.textContent.includes("NUEVO REGISTRO") || button.textContent.includes("Nuevo"))) {
                e.preventDefault();
                e.stopPropagation();
                setInternalOpen(true);
            }
        };

        document.addEventListener("click", handleGlobalClick, true);
        return () => document.removeEventListener("click", handleGlobalClick, true);
    }, [isControlled]);

    return (
        <div className="globalRegisterModal">
            <CustomModal isOpen={isOpen} onClose={handleClose}>
                {children || <RegisterForm />}
            </CustomModal>
        </div>
    );
}

export default GlobalRegisterModal;
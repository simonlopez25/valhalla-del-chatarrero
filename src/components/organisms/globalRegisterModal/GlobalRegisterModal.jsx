import { useState, useEffect } from "react";
import { CustomModal } from "../../molecules/customModal/CustomModal";
import { RegisterForm } from "../registerForm/RegisterForm";

export function GlobalRegisterModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleGlobalClick = (e) => {
            const button = e.target.closest("button");
            if (button && (button.textContent.includes("NUEVO REGISTRO") || button.textContent.includes("Nuevo"))) {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(true);
            }
        };

        document.addEventListener("click", handleGlobalClick, true);
        return () => document.removeEventListener("click", handleGlobalClick, true);
    }, []);

    return (
        <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <RegisterForm />
        </CustomModal>
    );
}
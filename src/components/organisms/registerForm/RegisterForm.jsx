import { useState } from "react";
import { FormField } from "../../molecules/formField/FormField";
import { CustomButton } from "../../atoms/customButton/CustomButton";
import { createUser } from "../../../services/userService";
import "./RegisterForm.css"

export const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        avatar: "https://picsum.photos/800",
    });

    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setFeedbackMessage("");

        try {
            await createUser(formData);
            setFeedbackMessage("¡Usuario creado con éxito en la API!");
            setFormData({
                name: "",
                email: "",
                password: "",
                avatar: "https://picsum.photos/800",
            });
        } catch (error) {
            setFeedbackMessage("Hubo un error al registrar el usuario. Revisa los datos.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className="registerForm">
            <h2>Registro de Nuevo Usuario</h2>
            <FormField
                labelText="Nombre"
                type="text"
                name="name"
                value={formData.name}
                placeholder="Ej: Patricia"
                onChange={handleInputChange}
            />
            <FormField
                labelText="Correo Electrónico"
                type="email"
                name="email"
                value={formData.email}
                placeholder="correo@correo.com"
                onChange={handleInputChange}
            />
            <FormField
                labelText="Contraseña"
                type="password"
                name="password"
                value={formData.password}
                placeholder="********"
                onChange={handleInputChange}
            />
            <FormField
                labelText="URL del Avatar"
                type="text"
                name="avatar"
                value={formData.avatar}
                placeholder="https://..."
                onChange={handleInputChange}
            />
            <CustomButton
                label={isLoading ? "Registrando..." : "Crear Usuario"}
                type="submit"
            />
            {feedbackMessage && <p className="feedbackMessage">{feedbackMessage}</p>}
        </form>
    );
};
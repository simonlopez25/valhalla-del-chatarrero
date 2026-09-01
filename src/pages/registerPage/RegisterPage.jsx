import { RegisterForm } from "../../components/organisms/registerForm/RegisterForm";


function RegisterPage() {
    return (
        <main className="registerPageContainer">
            <div className="registerHeader">
                <h1>REGISTRO DE NUEVO SUPERVIVIENTE</h1>
                <p>Introduce los datos del nuevo individuo para incorporarlo al censo del páramo.</p>
            </div>

            <RegisterForm />
        </main>
    );
}

export default RegisterPage;
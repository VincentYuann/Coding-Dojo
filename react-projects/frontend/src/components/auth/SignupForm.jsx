import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { signupWithPassword } from "../../services/authService";

function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const { mutate: login, error } = useMutation({
        mutationFn: ({ email, password }) => signupWithPassword(email, password),
        onSuccess: () => navigate("/profile"),
        onError: (error) => alert(error.message)
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        login({ email, password });
    }

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <input
                type="email"
                name="email"
                placeholder="Email"
                className="auth-input"
                required
            />
            <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="auth-input"
                required
            />

            {error && <p className="error-message">{error.message}</p>}

            <div className="auth-footer">
                <label className="show-password">
                    <input type="checkbox" onClick={() => setShowPassword(!showPassword)} /> Show password
                </label>
                <button type="submit" className="btn-login">Sign up</button>

                <p>Don’t have an account? <Link to="/auth/login">Sign in</Link></p>
            </div>
        </form>
    );
}

export default SignupForm;
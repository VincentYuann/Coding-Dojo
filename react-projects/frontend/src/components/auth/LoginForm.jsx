import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { loginWithPassword } from "../../services/authService";
import { toast } from "react-hot-toast";

function LoginForm() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const { mutate: login, error, isPending } = useMutation({
        mutationFn: ({ email, password }) => loginWithPassword(email, password),
        onSuccess: () => navigate("/home"),
        onError: () => toast.error("Error logging in.")
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = credentials.email;
        const password = credentials.password;

        login({ email, password });
    }

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <input
                type="email"
                placeholder="Email"
                className="auth-input"
                value={credentials.email}
                onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                required
            />
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="auth-input"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                required
            />

            {error && <p className="error-message">{error.message}</p>}

            <div className="auth-footer">
                <label className="show-password">
                    <input type="checkbox" onClick={() => setShowPassword(!showPassword)} /> Show password
                </label>
                <button type="submit" className="btn-login" disabled={isPending}>
                    {isPending ? "Logging in..." : "Log in"}
                </button>

                <p>Don’t have an account? <Link to="/auth/signup">Sign up</Link></p>
                <Link to="/auth/forgot-password">Forgot password?</Link>
            </div>
        </form>
    );
}

export default LoginForm;
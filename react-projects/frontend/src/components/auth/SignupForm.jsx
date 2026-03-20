import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { signupWithPassword } from "../../services/authService";
import { toast } from "react-hot-toast";

function SignupForm() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const { mutate: login, error, isPending } = useMutation({
        mutationFn: ({ email, password }) => signupWithPassword(email, password),
        onSuccess: (data) => {
            const isExistingUser = data?.user?.identities?.length === 0;

            if (isExistingUser) {
                toast.error("This email is already registered. Try logging in.", { icon: '📩' });

            } else {
                toast.success("Account created successfully!");
                navigate("/auth/login");
            }
        },
        onError: (err) => toast.error(err.message || "Error signing up.")
    });

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
                    {isPending ? "Signing up..." : "Sign up"}
                </button>

                <p>Don’t have an account? <Link to="/auth/login">Log in</Link></p>
            </div>
        </form>
    );
}

export default SignupForm;
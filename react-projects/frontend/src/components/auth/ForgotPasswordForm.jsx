import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { forgotPassword } from "../../services/authService";

function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const { mutate: login, data, error } = useMutation({
        mutationFn: ({ email }) => forgotPassword(email),
        onSuccess: () => navigate("/home"),
        onError: (error) => alert(error.message)
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ email });
    }

    return (
        <>
            <h1>Forgot password? Enter your email and we'll send you a link to update your password.</h1>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="email"
                    placeholder="Email"
                    className="auth-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {error && <p className="error-message">{error.message}</p>}
                {data && <p className="success-message">Password reset email sent! Please check your inbox.</p>}

                <div className="auth-footer">
                    <button type="submit" className="btn-login">Send to email</button>

                    <p>Already have an account? <Link to="/auth/login">Log in</Link></p>
                </div>
            </form>
        </>
    );
}

export default ForgotPasswordForm;
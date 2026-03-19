import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, data } from "react-router-dom";
import { forgotPassword } from "../../services/authService";
import { toast } from "react-hot-toast";

function ForgotPasswordForm() {
    const [email, setEmail] = useState("");

    const { mutate: login, error, isPending } = useMutation({
        mutationFn: ({ email }) => forgotPassword(email),
        onSuccess: () => toast.success("Link sent to email!"),
        onError: () => toast.error("Error sending link.")
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ email });
    }

    return (
        <>
            <p>Forgot password? Enter your email and we'll send you a link to update your password.</p>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="email"
                    placeholder="Email"
                    className="auth-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {data && <p className="success-message">{data.message}</p>}
                {error && <p className="error-message">{error.message}</p>}

                <div className="auth-footer">
                    <button type="submit" className="btn-login" disabled={isPending}>
                        {isPending ? "Sending..." : "Send to email"}
                    </button>

                    <p>Already have an account? <Link to="/auth/login">Log in</Link></p>
                </div>
            </form>
        </>
    );
}

export default ForgotPasswordForm;
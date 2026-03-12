import { loginWithGoogle } from "../../services/authService";
import toast from "react-hot-toast";

function GoogleAuthButton() {
    const handleGoogleLogin = (e) => {
        try {
            loginWithGoogle();
        }
        catch (e) {
            toast.error("Error during Google Login:", e.message);
        }
    }

    return (
        <button
            onClick={handleGoogleLogin} className="google-btn"
        >
            <img src="/google-icon.svg" alt="Google Logo" className="google-icon" />
            <span>Sign in with Google</span>
        </button>
    );
}

export default GoogleAuthButton;
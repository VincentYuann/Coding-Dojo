import supabase from "../../services/supabaseClient";
import { loginWithGoogle } from "../../services/authService";

function GoogleAuthButton() {
    const handleSubmit = (e) => {
        try {
            loginWithGoogle();
        }
        catch (error) {
            console.error("Error during Google Login:", error.message);
        }
    }

    return (
        <button onClick={handleSubmit}></button>
    );
}

export default GoogleAuthButton;
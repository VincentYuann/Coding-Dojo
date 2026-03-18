import { signOut } from "../services/authService";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const { mutate: handleSignOut } = useMutation({
        mutationFn: signOut,
        onSuccess: () => navigate("/", { replace: true }),
        onError: (error) => new Error(error.message)
    })

    const handleUpdatePassword = () => {
        navigate("/update-password");
    }

    return (
        <div>
            <h2>Profile Page</h2>
            <div>
                <img
                    src={user?.user_metadata?.avatar_url || "/profile-placeholder.jpg"}
                    referrerPolicy="no-referrer"
                    alt="Profile" />
                <p>{user?.user_metadata.full_name}</p>
            </div>

            <button onClick={handleSignOut}>
                Sign Out
            </button>
            <button onClick={handleUpdatePassword}>
                Update Password
            </button>
        </div>
    )
}

export default ProfilePage;
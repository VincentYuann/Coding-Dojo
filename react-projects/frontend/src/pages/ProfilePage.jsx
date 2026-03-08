import { signOut } from "../services/authService";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
    const navigate = useNavigate();

    const { mutate: handleSignOut } = useMutation({
        mutationFn: signOut,
        onError: (error) => new Error(error.message),
        onSuccess: () => navigate("/", { replace: true })

    })

    return (
        <div>
            <img src="/profile-placeholder.jpg" alt="Profile" />

            <button onClick={handleSignOut}>
                Sign Out
            </button>
        </div>
    )
}

export default ProfilePage;
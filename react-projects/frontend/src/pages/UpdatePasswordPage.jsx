import { useState } from "react";
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../services/authService";
import { toast } from "react-hot-toast";

function UpdatePasswordPage() {
    const navigate = useNavigate();

    const { mutate: handleUpdatePassword, error } = useMuation({
        mutationFn: ({ newPassword }) => updatePassword(newPassword),
        onError: (error) => toast.error("Error updaing password:", error.message),
        onSucess: () => {
            toast.success("Password updated succesfully!");
            navigate("/profile");
        }
    })

    return (
        <div>
            <h2>Update Password Page</h2>
            <form>
                <button>
                    Update Password
                </button>
            </form>
        </div>
    );
}

export default UpdatePasswordPage;
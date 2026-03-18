import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
import { updatePassword, signOut } from "../services/authService";
import { toast } from "react-hot-toast";
import supabase from "../services/supabaseClient";

function UpdatePasswordPage() {
    const navigate = useNavigate();
    const [loginMethod, setLoginMethod] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const getSession = async () => {
            const { data: { claims } } = await supabase.auth.getClaims();
            setLoginMethod(claims.amr[0].method);
        }

        getSession();

        return async () => {
            if (loginMethod == "otp") {
                await signOut();
                toast("Security: Session cleared as reset was not finished.", { icon: '🔒', })
            }
        }
    }, [loginMethod])

    const { mutate: handlePasswordUpdate, error } = useMutation({
        mutationFn: ({ newPassword }) => updatePassword(newPassword),
        onError: () => toast.error("Error updating password"),
        onSuccess: async () => {
            toast.success("Password updated succesfully!");
            if (loginMethod == "otp") {
                await signOut();
            } else {
                navigate("/profile");
            }
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        handlePasswordUpdate({ newPassword })
    }

    return (
        <div>
            <h2>Update Password Page</h2>
            <form onSubmit={handleSubmit}>
                <input type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    Show password
                </label>
                <div>
                    {error && <p className="">{error.message}</p>}
                    <button>
                        Update Password
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdatePasswordPage;
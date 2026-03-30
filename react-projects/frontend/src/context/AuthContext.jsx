import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import supabase from "../services/supabaseClient"

const AuthContext = createContext();

function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const welcomeMessage = useRef(false);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            setLoading(false);

            console.log(event, session)

            if (event === 'SIGNED_IN') {
                setUser(currentUser);

                if (currentUser && !welcomeMessage.current) {
                    const name = currentUser.user_metadata?.full_name || "User";
                    toast(<span>Welcome back! <b>{name}</b> </span>, { icon: '👋' });
                    welcomeMessage.current = true;
                }

            } else if (event === 'SIGNED_OUT') {
                toast("You've been logged out.", { icon: '🔒' });
                setUser(null);
                welcomeMessage.current = false;

            } else if (event === 'PASSWORD_RECOVERY') {
                navigate("update-password")

            } else if (event === 'USER_UPDATED') {
                console.log("User updated");
            }
        })

        console.log("User:", user)

        return () => {
            subscription.unsubscribe()
        };
    }, []);

    const userContext = { user, loading };

    return (
        <AuthContext.Provider value={userContext}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}
export default AuthProvider;
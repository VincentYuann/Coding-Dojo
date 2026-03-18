import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import supabase from "../services/supabaseClient"

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            console.log(event, session)

            if (event === 'INITIAL_SESSION') {
                const currentUser = session?.user ?? null;
                setUser(currentUser);
                setLoading(false);

                if (currentUser) {
                    const name = currentUser.user_metadata?.full_name || "User";
                    toast(<span>Welcome back! <b>{currentUser.user_metadata?.full_name}</b> </span>, { icon: '👋' });
                }

            } else if (event === 'SIGNED_IN') {
                setUser(session.user);
                console.log("User signed in");

            } else if (event === 'SIGNED_OUT') {
                setUser(null);
                console.log("User signed out");

            } else if (event === 'PASSWORD_RECOVERY') {
                console.log("User signed out");

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
    const userContext = useContext(AuthContext);
    return userContext;
}
export default AuthProvider;
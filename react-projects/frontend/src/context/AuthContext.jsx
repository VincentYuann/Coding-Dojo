import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../services/supabaseClient"

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
        }

        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            console.log(event, session)

            if (event === 'INITIAL_SESSION') {
                // handle initial session
            } else if (event === 'SIGNED_IN') {
                setUser(session.user);
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
            } else if (event === 'PASSWORD_RECOVERY') {
                // handle password recovery event
            } else if (event === 'TOKEN_REFRESHED') {
                // handle token refreshed event
            } else if (event === 'USER_UPDATED') {

            }
        })

        console.log(data);
        getSession();

        return () => {
            data.subscription.unsubscribe()
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
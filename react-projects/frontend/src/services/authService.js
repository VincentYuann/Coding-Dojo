import supabase from './supabaseClient';

export const loginWithPassword = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({email: email, password: password});
    if (error) throw error;
    return data;
}

export const signupWithPassword = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({email: email, password: password});
    if (error) throw error;
    return data;
}

export const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: 'http://localhost:5173/profile',
        },
    })
    if (error) throw error;
}

export const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error;
}
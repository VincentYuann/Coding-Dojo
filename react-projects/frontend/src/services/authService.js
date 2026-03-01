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
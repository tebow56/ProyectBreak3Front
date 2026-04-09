
import { createContext, useContext, useState, useEffect } from "react";
import { useBasic } from "./basicContext";



const authContext = createContext();


export const useAuth = () => {
    return useContext(authContext);
}

export const AuthProvider = ({ children }) => {
        const { user, setUser, isLoading, setIsLoading } = useBasic();

        useEffect(() => {
            const fetchUser = async () => {
                    try {
                    const response = await fetch('http://localhost:3003/API/auth/active-session', {
                        credentials: 'include'
                    });
                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData);
                    } else {
                        window.location.href = '/login';
                        setUser(null);
                    }}
                    
                    catch (error) {
                        console.error('Error fetching user:', error);
                        setUser(null);
                    } finally {
                        setIsLoading(false);
                    }

            }
            fetchUser();
        }, []);
        

    return (  
        <authContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
            {children}
        </authContext.Provider>
    )
}
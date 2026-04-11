
import { createContext, useContext, useState, useEffect } from "react";
import { useBasic } from "./basicContext";
import { useNavigate, useLocation } from "react-router-dom";




const authContext = createContext();


export const useAuth = () => {
    return useContext(authContext);
}

export const AuthProvider = ({ children }) => {
        const { user, setUser, isLoading, setIsLoading } = useBasic();
        const navigate = useNavigate();
        const location = useLocation();

        useEffect(() => {
            const fetchUser = async () => {
                    try {
                    const response = await fetch('http://localhost:3003/API/auth/active-session', {
                        credentials: 'include'
                    });
                    if (response.ok) {
                        
                        const userData = await response.json();
                        setUser(userData);
                            if (userData.admin && location.pathname !== '/admin') {
                                navigate('/admin');
                            } else if (userData.admin === true && location.pathname === '/admin') {
                                navigate(location.pathname, { replace: true });
                            }   else {
                                navigate(location.pathname, { replace: true });
                            }
                    } else {
                            navigate('/login');
                            setUser(null);
                        }
                    }
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
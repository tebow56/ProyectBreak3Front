
import { createContext, useContext, useState, useEffect } from "react";
import { useBasic } from "./basicContext";
import { useNavigate, useLocation } from "react-router-dom";



const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3003"

const authContext = createContext();


export const useAuth = () => {
    return useContext(authContext);
}

export const AuthProvider = ({ children }) => {
        const { user, setUser, isLoading, setIsLoading, userData, setUserData } = useBasic();
        const navigate = useNavigate();
        const location = useLocation();
        useEffect(() => {
            
            const fetchUser = async () => {
                    if (location.pathname === '/login' || location.pathname === '/register') {
                    return; 
                }
                setIsLoading(true)
                    try {
                    const response = await fetch(`${apiUrl}/API/auth/active-session`, {
                        credentials: 'include'
                    });
                    if (response.ok) {
                    const userInfo = await response.json();
                    setUser(userInfo);
                    if(!userData) {
                        try {
                            const findresponse= await fetch(`${apiUrl}/API/users/getbyemail/${userInfo.email}`, {
                                credentials: 'include'
                            });
                            const newUserData= await findresponse.json()
                            setUserData(newUserData)
                        }catch (error){
                            console.error('Error:', error)
                        }}
                    if (userInfo.admin === true && !location.pathname.startsWith('/admin')) {
                            navigate('/admin');
                    } else if (userInfo.admin === false && location.pathname.startsWith('/admin')) {
                            navigate ('/user');
                    }
                    } else {
                        setUser(null)    
                        navigate('/login');
                            
                        }
                    }
                    catch (error) {
                        console.error('Error:', error);
                        setUser(null);
                    } finally {
                        setIsLoading(false);
                    }

            }
            fetchUser();
        }, [location.pathname, navigate, setUser, setIsLoading]);
        if (isLoading) {
        return (    
            <div>
                <p>Cargando...</p>
            </div>
        );
    }

    return (  
        <authContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
            {children}
        </authContext.Provider>
    )
}
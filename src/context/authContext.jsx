
import { createContext, useContext, useState, useEffect } from "react";
import { useBasic } from "./basicContext";
import { useNavigate, useLocation } from "react-router-dom";





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
                setIsLoading(true)
                    try {
                    const response = await fetch('http://localhost:3003/API/auth/active-session', {
                        credentials: 'include'
                    });
                    if (response.ok) {
                    const userInfo = await response.json();
                    setUser(userInfo);
                    if(!userData) {
                        try {
                            const findresponse= await fetch(`http://localhost:3003/API/users/getbyemail/${userInfo.email}`, {
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
                            navigate('/login');
                            setUser(null);
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
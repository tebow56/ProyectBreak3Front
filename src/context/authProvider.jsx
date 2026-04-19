import { useState, useEffect, useRef } from "react";
import { useBasic } from "./basicContext";
import { useNavigate, useLocation } from "react-router-dom";
import { authContext } from "./authContext";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3003";


export const AuthProvider = ({ children }) => {
    const { user, setUser, isLoading, setIsLoading, userData, setUserData } = useBasic();
    const navigate = useNavigate();
    const location = useLocation();
    const hasRedirected = useRef(false); // Track if we've already redirected

    useEffect(() => {
        const fetchUser = async () => {
            if (location.pathname === '/login') {
                setIsLoading(false);
                hasRedirected.current = false; // Reset on login page
                return;
            }

            setIsLoading(true);
            try {
                const response = await fetch(`${apiUrl}/API/auth/active-session`, {
                    credentials: 'include'
                });

                if (response.ok) {
                    const userInfo = await response.json();
                    setUser(userInfo);

                    if (!userData && userInfo.email) {
                        try {
                            const findresponse = await fetch(`${apiUrl}/API/users/getbyemail/${userInfo.email}`, {
                                credentials: 'include'
                            });
                            const newUserData = await findresponse.json();
                            setUserData(newUserData);
                        } catch (error) {
                            console.error('Error fetching user data:', error);
                        }
                    }

                    // Only redirect ONCE per session validation
                    if (!hasRedirected.current) {
                        const isAdminPath = location.pathname.startsWith('/admin');
                        
                        if (userInfo.admin === true && !isAdminPath) {
                            hasRedirected.current = true;
                            navigate('/admin', { replace: true });
                        } else if (userInfo.admin === false && isAdminPath) {
                            hasRedirected.current = true;
                            navigate('/user', { replace: true });
                        }
                    }
                    
                } else {
                    setUser(null);
                    if (location.pathname !== '/login') {
                        navigate('/login', { replace: true });
                    }
                }
            } catch (error) {
                console.error('Error en fetchUser:', error);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [location.pathname]);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                <p>Cargando sesión...</p>
            </div>
        );
    }

    return (
        <authContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
            {children}
        </authContext.Provider>
    )
}
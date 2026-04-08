import { useEffect } from "react";
import { useBasic } from "../context/basicContext";



const useFetchActiveSession = () => {
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
}

export default useFetchActiveSession;
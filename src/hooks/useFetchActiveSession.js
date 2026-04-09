import { useEffect } from "react";
import { useBasic } from "../context/basicContext";



const useFetchActiveSession = () => {
    const { setUser, setIsLoading } = useBasic();

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
                    if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                    } else {
                    window.location.href = '/';
                    setUser(null);
                }}
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
}

export default useFetchActiveSession;
import { Outlet, Link } from 'react-router-dom';
import { useBasic } from "../../context/basicContext";



function Root() {
const { user, setUser, isLoading, setIsLoading } = useBasic();

const logout = async () => {
    try {
        const response = await fetch('http://localhost:3003/API/auth/logout', {
            method: 'POST',
            credentials: 'include'
        });
        if (response.ok) {
            setUser(null);
            window.location.href = '/login';
        } else {
            console.error('Error al cerrar sesión');
        }} catch (error) {
            console.error('Error de conexión:', error);
        }
    };


    return (
        <>
            <header>
                <nav id= 'navBar'>
                    <Link to="/">Home</Link>
                    <Link to="/Historial">Historial</Link>
                    <Link to="/Perfil">Perfil</Link>
                    <Link to="/login" onClick={logout}>
                        Cerrar sesión
                    </Link>
                </nav>
            </header>
            <main>
            <Outlet/>
            </main>
            
        </>
    )
}

export default Root
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
                <nav id= 'navBar' style={{backgroundColor: '#9a1df367', display: 'flex', justifyContent: 'space-around', padding: '10px'}}>
                    <Link to="/user" className='link'>Inicio</Link>
                    <Link to="/user/Historial" className='link'>Historial</Link>
                    <Link to="/user/Perfil" className='link'>Perfil</Link>
                    <Link to="/login" className='link' onClick={logout}>
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
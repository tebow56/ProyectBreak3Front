import { Navigate, Outlet, Link, useNavigate } from 'react-router-dom';
import { useBasic } from "../../context/basicContext";
import './Root.css'
import milogo from '../../assets/logolabotica(1).jpg'

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3003"

function Root() {
const { user, setUser, isLoading, setIsLoading } = useBasic();
const navigate = useNavigate()

const logout = async () => {
    try {
        const response = await fetch(`${apiUrl}/API/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        if (response.ok) {
            setUser(null);
            navigate ('/login');
        } else {
            console.error('Error al cerrar sesión');
        }} catch (error) {
            console.error('Error de conexión:', error);
        }
    };


    return (
        <>
            
            <header className='nav-header'>
                <nav id= 'navBar' className='nav-bar' style={{backgroundColor: '#9a1df367', display: 'flex', justifyContent: 'space-around', padding: '10px'}}>
                    <div className="logo" style={{fontWeight: 'bold', fontSize: '1.2rem', color: '#a78bfa'}}>
                        <img src={milogo} style={{width:"75px", height:'70px'}}alt="Logo"/>
                    </div>
                    <div className='nav-links'>
                        <Link to="/user" className='link-nav'>Inicio</Link>
                        <Link to="/user/Historial" className='link-nav'>Historial</Link>
                        <Link to="/user/Perfil" className='link-nav'>Perfil</Link>
                        <Link to="/login" className='link-nav' onClick={logout}>
                            Cerrar sesión
                        </Link>
                    </div>
                </nav>
            </header>
            
            <main>
            <Outlet/>
            </main>
            
        </>
    )
}

export default Root
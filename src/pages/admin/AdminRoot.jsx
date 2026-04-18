import { Outlet, Link } from 'react-router-dom';
import { useBasic } from "../../context/basicContext";
import { useNavigate } from 'react-router-dom';


const apiUrl = import.meta.env.VITE_API_URL;

const AdminRoot = () =>     {
    const { user, setUser, isLoading, setIsLoading,setUserData } = useBasic();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const response = await fetch(`${apiUrl}/API/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            });
            if (response.ok) {
                setUser(null);
                setUserData(null)
                navigate('/login');
            } else {
                console.error('Error al cerrar sesión');
            }} catch (error) {
                console.error('Error de conexión:', error);
            }
        };


        return (
            <>
                <header>
                    <nav id= 'navBar' style={{backgroundColor: '#970afc5a', display: 'flex', justifyContent: 'space-around', padding: '10px'}}>
                        <Link to="/admin" className='link'>Home</Link>
                        <Link to="/admin/historial" className='link'>Historial</Link>
                        <Link to="/admin/perfil" className='link'>Perfil</Link>
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

export default AdminRoot
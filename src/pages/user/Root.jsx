import { Outlet, Link } from 'react-router-dom';



function Root() {

    
    return (
        <>
            <header>
                <nav id= 'navBar'>
                    <Link to="/">Home</Link>
                    <Link to="/Historial">Historial</Link>
                    <Link to="/Perfil">Perfil</Link>
                    <Link to="/login">Cerrar sesión</Link>
                </nav>
            </header>
            <main>
            <Outlet/>
            </main>
            
        </>
    )
}

export default Root
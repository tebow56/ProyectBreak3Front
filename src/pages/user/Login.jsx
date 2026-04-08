import { useState } from 'react'
import { useBasic } from '../../context/basicContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { setUser, setIsLoading } = useBasic();


    const handleSubmit = async (e) => {
            e.preventDefault(); 
            setIsLoading(true);
            setError(null);
            
            try {
                const response = await fetch('http://localhost:3003/API/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include', // Importante para cookies
                    body: JSON.stringify({ email, password })
                });
                
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                    window.location.href = '/'; // Redirige al home
                } else {
                    const data = await response.json();
                    setError(data.message || 'Error al iniciar sesión');
                }
            } catch (error) {
                console.error('Error:', error);
                setError('Error de conexión');
                return (<div>
                    <p>{error}</p>
                </div> )
            } finally {
                setIsLoading(false);
            }
        }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    
    const checkSession = async () => {
        try {
            const response = await fetch('http://localhost:3003/API/auth/active-session', {
                credentials: 'include'
            });
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                window.location.href = '/'; // Redirige al home
            }
        } catch (error) {
            console.error('Error checking session:', error);
        }
    };
    checkSession();

    return (
        <div>
            <h1>Iniciar sesión</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" onChange={handleEmailChange} id="email" placeholder="Escribe tu email" required/>
                <label htmlFor="password">Contraseña</label>
                <input type="password" onChange={handlePasswordChange} id="password" placeholder="Escribe tu contraseña" required/>
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    )
}

export default Login
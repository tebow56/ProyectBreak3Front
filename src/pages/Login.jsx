import { useState, useEffect } from 'react'
import { useBasic } from '../context/basicContext';




const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { setUser, setIsLoading, setUserData } = useBasic();


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
                    credentials: 'include', 
                    body: JSON.stringify({ email, password })
                });
                
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                    const findUser = async (email) => {
                        try {
                        const findresponse= await fetch(`http://localhost:3003/API/users/getbyemail/${email}`, {
                            credentials: 'include'
                        });
                        if (findresponse.ok) {
                            const Data = await findresponse.json();
                            setUserData(Data);
                                if (Data.admin === true) {
                                    window.location.href = '/admin';
                                } else {
                                    window.location.href = '/';
                                }
                            }
                        } catch (error) {
                                    console.error('Error fetching admin data:', error);
                                }
                            }
                    findUser(email);
                    } else {
                    const data = await response.json();
                    setError(data.message || 'Error al iniciar sesión');
                }
            } catch (error) {
                console.error('Error:', error);
                setError('Error de conexión');
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
                window.location.href = '/'; 
            }
        } catch (error) {
            console.error('Error checking session:', error);
        }
    };
    useEffect(() => {
        checkSession();
    }, [window.location.href]);

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
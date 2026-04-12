import { useState, useEffect } from 'react'
import { useBasic } from '../context/basicContext';
import { useNavigate } from 'react-router-dom';
import milogo from '../assets/logolabotica(1).jpg'
import { Link } from 'react-router-dom';



const Login = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { setUser, setIsLoading, setUserData } = useBasic();


    const handleSubmit = async (e) => {
            e.preventDefault(); 
            setIsLoading(true);
            setError(null);
            
            try {
                const response = await fetch('https://glb-2wfb.onrender.com/API/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include', 
                    body: JSON.stringify({ email, password })
                });
                
                if (response.ok) {
                    const uData = await response.json();
                    setUser(uData);
                    const findUser = async (email) => {
                        try {
                        const findresponse= await fetch(`https://glb-2wfb.onrender.com/API/users/getbyemail/${email}`, {
                            credentials: 'include'
                        });
                        if (findresponse.ok) {
                            const Data = await findresponse.json();
                            setUserData(Data);
                                if (Data.admin === true) {
                                    navigate('/admin');
                                } else {
                                    navigate('/user');
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
            const response = await fetch('https://glb-2wfb.onrender.com/API/auth/active-session', {
                credentials: 'include'
            });
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                navigate(userData.admin ? '/admin' : '/'); 
            }
        } catch (error) {
            console.error('Error checking session:', error);
        }
    };
    useEffect(() => {
        checkSession();
    }, [navigate]);

    return (
        <div>
            <img src={milogo} alt="Logo"  style={{width: '200px', height: 'auto'}}/>
            <h1>Iniciar sesión</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px', margin: '0 auto' }}>
                <label htmlFor="email">Email</label>
                <input type="email" onChange={handleEmailChange} id="email" placeholder="Escribe tu email" required/>
                <label htmlFor="password">Contraseña</label>
                <input type="password" onChange={handlePasswordChange} id="password" placeholder="Escribe tu contraseña" required/>
                <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Iniciar sesión</button>
                <Link to="/altacliente">
                    <button style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#8705f9', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Crear Usuario</button>
                </Link>
            </form>
        </div>
    )
}

export default Login



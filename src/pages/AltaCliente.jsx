
import milogo from '../assets/logolabotica(1).jpg'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const AltaCliente = ()=> {
    const [respuesta, setRespuesta] = useState ('')
    const [codigo, setCodigo] = useState('')
    const [error, setError] =useState('')
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        farmacia: '',
        email: '',
        password: '',
    })
    const navigate = useNavigate()

    useEffect(()=>{
        const useFetch =async ()=> {
            try {
                const response = await fetch('https://glb-2wfb.onrender.com/API/codes',{
                    method: 'GET',
                    credentials: 'include', 
                    })
                if (response.ok) {
                const responsejson = await response.json()  
                const responseCodes = responsejson.map((code) => code.code)
                setCodigo(responseCodes)
                }
            } catch (error) {
                console.error('Error:', error);
                setError('Error de conexión');
            }
        }
        useFetch()
    },[respuesta])
    
const handleSumbit = async (e)=>{
    e.preventDefault()
    console.log(formData)
    if(!codigo.includes(respuesta)) {
        setError('Codigo inválido')
        alert('Código incorrecto')
        return
    }
        try {
            const response = await fetch ('https://glb-2wfb.onrender.com/API/users/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', 
                body: JSON.stringify(formData)
            })
            if (response.ok){
                const responsejson = await response.json()
                alert('Usuario creado correctamente')
                navigate('/login')
            }            
        } catch (error) {
            console.error('Error:', error);
            setError('Error de conexión');        
        }
}  


const handleChange = (e) => {
        const { id, value } = e.target
        setFormData(prev => ({ ...prev, [id]: value }))
    }

    return (
        <>
            <div>
                <img src={milogo} alt="Logo"  style={{width: '200px', height: 'auto'}}/>
                <h1>Crea tu Cuenta</h1>
                <form onSubmit={handleSumbit} style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '300px', margin: '0 auto', textAlign:"left" }}>
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" value={formData.nombre} onChange={handleChange} placeholder="Escribe tu nombre" required/>
                    <label htmlFor="apellidos">Apellidos</label>
                    <input type="text" id="apellidos" value={formData.apellidos} onChange={handleChange} placeholder="Escribe tus apellidos" required/>
                    <label htmlFor="farmacia">Farmacia</label>
                    <input type="text" id="farmacia" value={formData.farmacia} onChange={handleChange} placeholder="Ej: Farmacia German" required/>
                    <label htmlFor="codigo">Código</label>
                    <input type="text" id="codigo" value={respuesta} onChange={(e)=>setRespuesta(e.target.value)} placeholder="Escribe el codigo" required/>
                    {respuesta && codigo.includes(respuesta) ? <p style= {{color:'green'}}>¡Correcto!</p> : <p style={{color:"red"}}>Código Incorrecto</p>}               
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Escribe tu email" required/>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" value={formData.password} onChange={handleChange} placeholder='Escribe tu contraseña' required/>
                    <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Crear Cuenta</button>
                </form>
            </div>
        </>
    )
}

export default AltaCliente
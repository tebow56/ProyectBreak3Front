import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useBasic } from "../../context/basicContext";


const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3003"
const UserPoposal = () => {
    const { proposalId } = useParams();
    const url = `${apiUrl}/API/proposals/${proposalId}`;
    const { datafetch } = useFetch(url);
    const [unidades, setUnidades] = useState({});
    const { user } = useBasic();

    if (!datafetch) return <p>Cargando...</p>;
    const { nombre, articulo } = datafetch;

    const handleChange = (cn, value) => {
        setUnidades({
            ...unidades,
            [cn]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const itemsParaEnviar = articulo
            .filter(item => unidades[item.cn] > 0) 
            .map(item => ({
                cn: item.cn,                
                descripcion: item.descripcion, 
                unidades: parseInt(unidades[item.cn], 10) 
            }));

        const bodyCompleto = {
            usuario: user.email,
            laboratorio: nombre,
            items: itemsParaEnviar
        };


        try {
            await fetch(`${apiUrl}/API/orders`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyCompleto)
            });
            alert("¡Propuesta enviada con éxito!");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>{nombre}</h1>
            <div style={{ display: 'flex',justifyContent: 'space-evenly', gap: '10px', fontWeight: 'bold', marginBottom: '10px' }}>
            <p>CN</p><p>Descripción</p><p>Unidades</p>
             </div>
            <form onSubmit={handleSubmit}>
                {articulo && articulo.map((item) => (
                    <div key={item.cn} style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                        <strong style={{ marginRight: '10px',display: 'inline-block', minWidth: '150px' }}>{item.cn}</strong>
                        <span style={{ marginRight: '20px', display: 'inline-block', minWidth: '400px', textAlign: 'left'    }}>{item.descripcion}</span>
                        
                        <input 
                            type="number" 
                            min="0" 
                            placeholder="Cant."
                            value={unidades[item.cn] || ""} 
                            onChange={(e) => handleChange(item.cn, e.target.value)}
                            style={{ width: '60px' }}
                        />
                    </div>
                ))}
                
                <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Enviar Propuesta
                </button>
            </form>
        </div>
    );
};

export default UserPoposal;


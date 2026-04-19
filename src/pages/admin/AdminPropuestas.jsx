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
    const [observaciones, setObservaciones]= useState('')

    if (!datafetch) return <p>Cargando...</p>;
    const { nombre, articulo } = datafetch;

    const handleChange = (cn, value) => {
        setUnidades({
            ...unidades,
            [cn]: value
        });
    };
    
    const {createdAt}= datafetch
    const handleChangeObservaciones= (e)=> {
        e.preventDefault();
        setObservaciones(e.target.value)
    }

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
        <div className="detalle-pedido">
            <h2>{nombre}</h2>
            <p>Fecha de creacion: {new Date(createdAt).toLocaleDateString()}</p>
            <form onSubmit={handleSubmit}>
            <table className="tablaPedido" border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>CN</th>
                        <th>Descripción</th>
                        <th>Unidades</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {articulo && articulo.map((item) => (
                        <tr key={item._id}>
                            <td>{item.cn}</td>
                            <td>{item.descripcion}</td>
                            <td>
                                <input 
                                    type="number" 
                                    min="0" 
                                    placeholder="Cant."
                                    value={unidades[item.cn] || ""} 
                                    onChange={(e) => handleChange(item.cn, e.target.value)}
                                    style={{ width: '60px' }}
                                />
                            </td>
                        </tr>
                    ))}


                
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3">    
                            <textarea type="text" style={{width:'100%', height:'80px', boxSizing: "border-box"}} onChange={handleChangeObservaciones} placeholder="Escribir observaciones,artículos que no están en la propuesta, aclaraciones... "></textarea>
                        </td>
                    </tr>
                </tfoot>
            </table>
                    <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} >
                    Enviar Propuesta
                    </button>
            </form>

            {!articulo && <p>No hay artículos en este pedido.</p>}
        </div>
                
    );
};

export default UserPoposal;


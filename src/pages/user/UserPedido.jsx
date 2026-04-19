
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3003"
const UserPedido = ()=>{
    const { orderId } = useParams();
    const url = `${apiUrl}/API/orders/${orderId}`;
    const { datafetch } = useFetch(url);

    if (!datafetch) return <p>Cargando...</p>;
    
    const {laboratorio, articulo, createdAt, observaciones} = datafetch

    console.log(datafetch)

    return (
        <>
        <div className="detalle-pedido">
            <h2>{laboratorio}</h2>
            <p>Fecha de creacion: {new Date(createdAt).toLocaleDateString()}</p>
            
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
                            <td>{item.unidades}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3" style={{textAlign:"center"}}>
                            {observaciones}    
                        </td>
                    </tr>
                </tfoot>

            </table>

            {!articulo && <p>No hay artículos en este pedido.</p>}
        </div>
        
        </>
    )
}


export default UserPedido
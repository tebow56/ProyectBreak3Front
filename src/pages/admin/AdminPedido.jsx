import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { CSVLink } from "react-csv";

const AdminPedido = ()=>{
    const { orderId } = useParams();
    const url = `https://glb-2wfb.onrender.com/API/orders/${orderId}`;
    const { datafetch } = useFetch(url);
    

    if (!datafetch) return <p>Cargando...</p>;
    
    const {laboratorio, articulo, createdAt,usuario} = datafetch

    const csvData = [
        ["Fecha de creación:", createdAt],
        ["Email del Pedido:", usuario || ''], 
        [""], 
        ["Código Nacional (CN)", "Descripción", "Unidades"], 
        ...(articulo || []).map(item => [
            item.cn || '', 
            item.descripcion || '', 
            item.unidades || 0
        ])
    ];
    const fileName = `pedido_${laboratorio}_${orderId}.csv`

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
            </table>
            {articulo && articulo.length > 0 && csvData.length > 0 && (
                <CSVLink 
                    data={csvData} 
                    filename={fileName}
                    separator={";"}
                    style={{ textDecoration: 'none' }}
                >
                    <button 
                        type="button"
                        style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Descargar CSV
                    </button>
                </CSVLink>
            )}
            {!articulo && <p>No hay artículos en este pedido.</p>}
        </div>
        
        </>
    )
}

export default AdminPedido
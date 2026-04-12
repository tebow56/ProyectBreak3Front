import { Link } from "react-router-dom"


const ListadoHistorialAdmin = ({orders})=>{
  
        return (
        <>
            <div> 
                <h2>Pedidos Realizados</h2>
                    <ul className="listadoPedidos" style={{listStyle:"none"}}>
                        {orders.map((order) => ( 
                            <li key={order._id}>
                                <h3><Link className="link" to={`/admin/historial/${order._id}`}>{order.laboratorio}</Link></h3>
                                <p style= {{fontSize:'5pxS'}}>{order.usuario}</p><p>{new Date(order.createdAt).toLocaleDateString()}</p>
                                
                            </li>
                        ))}
                    </ul>
            </div>
        
        </>

    )
}

export default ListadoHistorialAdmin
import { Link } from "react-router-dom"

const ListadoHistorialUser = ({orders})=>{
    
    return (
        <>
            <div> 
                <h2>Pedidos Realizados</h2>
                    <ul className="listadoPedidos" style={{listStyle:"none"}}>
                        {orders.map((order) => ( 
                            <li key={order._id}>
                                <h3><Link className="link" to={`/user/historial/${order._id}`}>{order.laboratorio}</Link></h3>
                                <p style= {{fontSize:'5pxS'}}>{new Date(order.createdAt).toLocaleDateString()}</p>
                                
                            </li>
                        ))}
                    </ul>
            </div>
        
        </>

    )
}

export default ListadoHistorialUser
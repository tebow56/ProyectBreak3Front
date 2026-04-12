
import useFetch from "../../hooks/useFetch";

import ListadoHistorialAdmin from "../../components/ListadoHistorialAdmin";

const AdminHistorial = () => {
    const url = 'http://localhost:3003/API/orders'
    const { datafetch } = useFetch(url);
  
    if (!datafetch)return <p>Cargando...</p>
    
    return (
        <div>
            <h1>Historial</h1>
            <ListadoHistorialAdmin orders={datafetch}/>
            
        </div>
    )
}

export default AdminHistorial
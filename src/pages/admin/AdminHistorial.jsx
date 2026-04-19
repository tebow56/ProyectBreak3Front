
import useFetch from "../../hooks/useFetch";
import ListadoHistorialAdmin from "../../components/ListadoHistorialAdmin";


const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3003"

const AdminHistorial = () => {
    const url = `${apiUrl}/API/orders`
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
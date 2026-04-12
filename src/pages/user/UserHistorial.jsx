import { useBasic } from "../../context/basicContext";
import useFetch from "../../hooks/useFetch";
import { useState, useEffect } from "react";
import HistorialUser from "../../components/ListadoHistorialUser";


const UserHistorial = () => {
    const url = 'http://localhost:3003/API/orders'
    const { datafetch } = useFetch(url);
    const {user} = useBasic()
    const [orders,setOrders]=useState([])

   useEffect(() => {
        if (datafetch && user?.email) {
            const filtered = datafetch.filter((data) => data.usuario === user.email);
            setOrders(filtered);
        }
    }, [datafetch, user.email])
    
    return (
        <div>
            <h1>Historial</h1>
            <HistorialUser orders={orders}/>
            
        </div>
    )
}

export default UserHistorial
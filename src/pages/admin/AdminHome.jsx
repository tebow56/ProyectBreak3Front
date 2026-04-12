import { useState, useEffect } from "react";
import ListadoPropuestasAdmin from "../../components/ListadoPropuestasAdmin";

const AdminHome = () => {
    const [data, setData] = useState([]);
    const getdata = async () => {
        try {
            const response = await fetch('https://glb-2wfb.onrender.com/API/proposals', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            setData(data);
            console.log(data)
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    };
        useEffect(() => {
        getdata();
    }, []);

    return (
        <div>
            <h1>Inicio</h1>
            <ListadoPropuestasAdmin data={data} refreshData={getdata} />
        </div>
    )
}

export default AdminHome
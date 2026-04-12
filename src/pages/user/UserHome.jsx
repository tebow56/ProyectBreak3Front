import ListadoPropuestasUsers from "../../components/ListadoPropuestasUsers"
import { useState, useEffect } from "react";


const UserHome = () => {
    const [data, setData] = useState([]);
    const getdata = async () => {
        try {
            const response = await fetch('https://glb-2wfb.onrender.com/API/proposals', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            setData(data);
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
            <ListadoPropuestasUsers data={data} refresh={getdata} />
        </div>
    )
}

export default UserHome
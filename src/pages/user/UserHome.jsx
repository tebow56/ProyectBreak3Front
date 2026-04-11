import ListadoPropuestasUsers from "../../components/ListadoPropuestasUsers"
import { useState, useEffect } from "react";


const UserHome = () => {
    const [data, setData] = useState([]);
    const getdata = async () => {
        try {
            const response = await fetch('http://localhost:3003/API/proposals', {
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
            <ListadoPropuestasUsers data={data} refresh={getdata} />
        </div>
    )
}

export default UserHome
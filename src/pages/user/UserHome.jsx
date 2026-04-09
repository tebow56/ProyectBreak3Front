import ListadoPropuestas from "../../components/ListadoPropuestasUsers"
import { useState, useEffect } from "react";


const UserHome = () => {
        const [data, setData] = useState([]);

    useEffect(() => {
        getdata();
    }, []);
    const getdata = async () => {
        try {
            const response = await fetch('http://localhost:3003/API/proposals');
            const data = await response.json();
            setData(data);
            console.log(data)
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    };


   

    return (
        <div>
            <h1>Home</h1>
            <ListadoPropuestas data={data} />
        </div>
    )
}

export default UserHome
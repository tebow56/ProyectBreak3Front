
import {useState, useEffect} from 'react';

const useFetch = (url)=> {
    const [data, setData] = useState(null)


    useEffect (() =>{
       const fetchData = async () => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include'
                })
            const newData = await response.json()
            setData(newData)
        } catch (error) {
            console.log (error)
        } 
    }
    if (url) {
        fetchData();
    }
    }, [url])

    return {data}
    
};

export default useFetch 
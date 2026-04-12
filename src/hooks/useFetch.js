
import {useState, useEffect} from 'react';

const useFetch = (url)=> {
    const [datafetch, setDatafetch] = useState(null)


    useEffect (() =>{
       const fetchData = async () => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include'
                })
            const newData = await response.json()
            setDatafetch(newData)
        } catch (error) {
            console.log (error)
        } 
    }
    if (url) {
        fetchData();
    }
    }, [url])

    return {datafetch}
    
};

export default useFetch 
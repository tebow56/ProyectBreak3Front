
import {useState, useEffect} from 'react';

const useFetch = (url)=> {
    const [data, setData] = useState(null)


    useEffect (() =>{
       const fetchdata = async () => {
        try {
            const response = await fetch(url)
            const newData = await response.json()
            setData(newData)
        } catch (error) {
            console.log (error)
        } 
        fetchdata()
    }}, [url])

    return {data}
    
};


export default useFetch
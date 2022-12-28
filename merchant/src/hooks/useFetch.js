import axios from "axios";
import { useEffect, useState } from "react"
import { useAppContext } from "../context/appContext"


const useFetch = (url) =>{
    const[data,setData] = useState([]);
    const[loading,setLoading] = useState([false]);
    const[error,setError] = useState([false]);
    
    const {
        cookies
    } = useAppContext();

    const axiosFetch = axios.create({
        headers:{
            Authorization: `Bearer ${cookies}`
        }
    })

    useEffect(() =>{
        const fetchData = async () =>{
            
            setLoading(true);

            try {
                const res = await axiosFetch.get(url);
                setData(res.data);
            } catch (err) {
                setError(err)
            }

            setLoading(false);

        };

        fetchData();

    }, [url]);

    const reFetch = async() =>{
        setLoading(true);
        try {
            const res = await axiosFetch.get(url);
            setData(res.data);
        } catch (err) {
            setError(err)
        }
        setLoading(false);
    }

    return {data,loading,error,reFetch};

}

export default useFetch;
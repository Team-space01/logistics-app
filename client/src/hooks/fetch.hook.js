import axios from "axios";
import { useEffect, useState } from "react";
import { getEmail } from '../helpers/helper'

axios.defaults.baseURL = 'https://logistics-app-y14i.onrender.com'
//'http://localhost:9000'

/**Custom Hooks */
export default function useFetch(query){
    const [data, setData] = useState({ isLoading: true, apiData: null, status: null, serverError: null})
    
    useEffect(() => {

        const fetchData = async () => {
            try {
                
                const { email } = !query ? await getEmail() : '';

                const { data, status} = !query ? await axios.get(`api/user/${email}`) : await axios.get(`/api/${query}`) 
                
                
                console.log('data from hooks', data)
                if (status === 200) {
                    setData({ isLoading: false, apiData: data, status: status, serverError: null })
                } else {
                    setData({ isLoading: false, apiData: null, status: status, serverError: null })
                }
            } catch (error) {
                setData({ isLoading: false, apiData: null, status: null, serverError: error })
            }
        };
        fetchData()
    }, [query])

    return data;
}



/**
import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "http://localhost:9000"

//Custom Hooks 
export default function useFetch(query){
    const [getData, setData] = useState({ isLoading: false, apiData: undefined, status: null, serverError: null})
    
    useEffect(() => {
        if(!query) return;

        const fetchData = async () => {
            try {
                setData(prev => ({...prev, isLoading: true}))

                const { data, status} = await axios.get(`/api/${query}`)
                
                console.log('data from hooks', data)
                if(status === 201){
                    setData(prev => ({...prev, isLoading: false}))
                    setData(prev => ({...prev, apiData: data, status: status}))
                }

                setData(prev => ({...prev, isLoading: false}))
                

            } catch (error) {
                setData(prev => ({...prev, isLoading: false, serverError: error}))
            }
        };
        fetchData()

    }, [query])

    return [getData, setData]
}

*/
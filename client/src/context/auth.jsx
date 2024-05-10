import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const Authcontext = createContext()

const Authprovider = ({children}) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    })

    //default axios
    axios.defaults.headers.common['Authorization'] = auth?.token;
    
    useEffect(() =>{
        const data = localStorage.getItem('auth')
        if(data){
            const parseData = JSON.parse(data)
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token
            })
        }
        //eslint-disable-next-line
    }, []) 

    return(
        <Authcontext.Provider value={[auth, setAuth]}>
            {children}
        </Authcontext.Provider>
    )
}

//custom hook
const useAuth = () => useContext(Authcontext)

export {useAuth, Authprovider}
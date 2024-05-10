import { useState, useContext, createContext } from "react";


const Searchcontext = createContext()

const Searchprovider = ({children}) => {
    const [value, setValue] = useState({
        keywords: '',
        results : []
    })


    

    return(
        <Searchcontext.Provider value={[value, setValue]}>
            {children}
        </Searchcontext.Provider>
    )
}

//custom hook
const useSearch = () => useContext(Searchcontext)

export {useSearch, Searchprovider}
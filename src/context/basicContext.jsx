
import { createContext, useContext, useState, useEffect } from "react";
const basicContext = createContext();


export const useBasic = () => {
    return useContext(basicContext);
}

export const BasicProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);

    return (  
        <basicContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
            {children}
        </basicContext.Provider>
    )
}
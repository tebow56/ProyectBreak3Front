
import { createContext, useContext, useState, useEffect } from "react";
const basicContext = createContext();


export const useBasic = () => {
    return useContext(basicContext);
}

export const BasicProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ userData, setUserData ] = useState(null);

    return (  
        <basicContext.Provider value={{ user, setUser, isLoading, setIsLoading, userData, setUserData }}>
            {children}
        </basicContext.Provider>
    )
}
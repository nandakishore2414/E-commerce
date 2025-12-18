import { createContext, useState, useEffect } from "react";
import api from "../../axios";

export const LogginContext = createContext(null);

export const LogginProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await api.get("/check-auth");
                if (res.status === 200) {
                    setIsLogged(true);
                }
            } catch (error) {
                // Not logged in or error
                setIsLogged(false);
            }
        };
        checkAuth();
    }, []);

    return (
        <LogginContext.Provider value={{ isLogged, setIsLogged }}>
            {children}
        </LogginContext.Provider>
    );
};
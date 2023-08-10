import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("/profile");
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
    
        if (!user) {
            fetchData();
        }
    }, [user]);

    console.log(user);

    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
 
            </UserContext.Provider>
    );
}

import { createContext,useState } from "react";
const UserType = createContext();

const UserContext = ({children}) => {
    const [accountId,setAccountId] = useState("");
    return (
        <UserType.Provider value={{accountId,setAccountId}}>
            {children}
        </UserType.Provider>
    )
}
export {UserType,UserContext};
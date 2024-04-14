import { createContext, useState } from 'react'
const UserType = createContext()

const UserContext = ({ children }) => {
    const [accountId, setAccountId] = useState('')
    const [conversations, setConversations] = useState([])
    return (
        <UserType.Provider
            value={{ accountId, setAccountId, conversations, setConversations }}
        >
            {children}
        </UserType.Provider>
    )
}
export { UserType, UserContext }

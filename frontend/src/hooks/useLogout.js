import { UseAuthContext } from "./UseAuthContext"
import { useNotesContext } from "./UseNotesContext"

export const useLogout = () => {
    const { dispatch } = UseAuthContext()
    const { dispatch : noteDispatch } = useNotesContext()

    const logout = () => {
        localStorage.removeItem("user")
        
        dispatch({ type: "LOGOUT"})

        noteDispatch({ type: "SET_NOTES", payload: []})
    }
    return {logout}
}
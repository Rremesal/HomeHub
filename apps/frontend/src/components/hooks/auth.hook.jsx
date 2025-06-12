import { AuthContext } from "@/providers/auth.provider"
import { useContext } from "react"

/**
 * Returns functions and variables to manage authentication
 * 
 * @returns {Object} currentUser, login, logout
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) return null;
  return context;
}

export default useAuth;
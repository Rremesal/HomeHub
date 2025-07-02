import { AuthContext } from "@/providers/auth.provider"
import { useContext } from "react"

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) return null;
  return context;
}

export default useAuth;
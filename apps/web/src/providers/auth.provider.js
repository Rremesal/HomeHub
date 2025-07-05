import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

// Core
import { getMe, loginUser, logoutUser } from "@/mutations/auth";

// Utils
import { PUBLIC_ROUTES } from "@/utils/routes.const";

export const AuthContext = createContext();

function AuthProvider(props) {
  const { children } = props;

  const [currentUser, setCurrentUser] = useState(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser
  });

  const { mutateAsync: logoutCurrentUser } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutUser
  });

  const { isSuccess, data: me, refetch } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: isLoggedIn,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (me) setCurrentUser(me)
  }, [me])

  const login = async (formData) => {
    try {
      await mutateAsync(formData);
      setIsLoggedIn(true);
      if (isSuccess) setCurrentUser(me)
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await logoutCurrentUser();
      setCurrentUser(null);
      router.replace("/login");
    } catch (error) {
      throw error;
    }
  }

  const state = {
    currentUser: currentUser,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
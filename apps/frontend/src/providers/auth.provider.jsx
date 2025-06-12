import { deleteSession, getMe, login as loginMutation } from "@/mutations/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider(props) {
  const router = useRouter();
  const { children } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const {  mutateAsync: loginUser } = useMutation({
    mutationFn: loginMutation,
    onSuccess: () => {
      setIsLoggedIn(true);
      router.replace("/");
    },
  });

  const { mutateAsync: logoutUser } = useMutation({
    mutationFn: deleteSession,
    mutationKey: ["logout"]
  })

  const { data, refetch } = useQuery({
    queryFn: getMe,
    queryKey: ["me"],
    enabled: isLoggedIn,

  });

  useEffect(() => {
    if (!router.asPath.includes("/login")) {
      refetch();
    }
  }, [])

  useEffect(() => {
    setCurrentUser(data)
  }, [data]);

  const login = async values => {
    try {
      await loginUser(values);
    } catch (error) {
      throw error.message;
    }
  }

  const logout = async () => {
    try {
      await logoutUser();
      setCurrentUser(null);
      router.replace("/login");
    } catch (error) {
      console.log(error)
      throw error.message;
    }
  }

  const state = {
    login,
    logout,
    currentUser,
  }

  return (
    <AuthContext.Provider value={state}>
      {children}
    </ AuthContext.Provider>
  )
}

export default AuthProvider;
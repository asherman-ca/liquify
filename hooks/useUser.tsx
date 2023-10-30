"use client";
import { User } from "@supabase/auth-helpers-nextjs";
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";

interface ReturnedUser extends User {
  balance: number;
}

type UserContextType = {
  user: ReturnedUser | null;
  isLoading: boolean;
  supabase: any;
};

export const UserContext = createContext<UserContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();
  const supauser = useSupaUser();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(isLoadingUser);
  const getBalance = () =>
    supabase.from("balances").select("balance").eq("user_id", supauser!.id);
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (session) {
      const { user } = session;
      setUser(user);
      getBalance().then((res) => {
        setBalance(res.data![0].balance);
      });
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [session]);

  const res = {
    user,
    isLoading: isLoadingUser,
    supabase,
    balance,
  };

  return (
    <UserContext.Provider value={res}>{props.children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};

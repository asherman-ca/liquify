"use client";
import { User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  balance: number | null;
  user: User | null;
  supabase: any;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    let unsub: any = null;
    if (session) {
      const { user } = session;
      setUser(user);
      supabase
        .from("balances")
        .select("balance")
        .eq("user_id", user.id)
        .then((res) => {
          setBalance(res.data![0].balance);
        });
      unsub = supabase
        .channel("custom-update-channel")
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "balances",
            filter: `user_id=eq.${user?.id}`,
          },
          (payload: any) => {
            console.log("Change received!", payload);
            setBalance(payload.new.balance);
          },
        )
        .subscribe();
    }
    return () => {
      if (unsub) {
        supabase.removeChannel(unsub);
      }
    };
  }, [session]);

  const res: UserContextType = {
    user,
    supabase,
    balance,
  };

  return (
    <UserContext.Provider value={res} {...props} />
    //   {props.children}
    // </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};

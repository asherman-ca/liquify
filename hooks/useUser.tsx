"use client";
import { User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  balance: number | null;
  user: User | null;
  supabase: any;
  positions: Position[] | null;
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
  const [positions, setPositions] = useState<Position[] | null>(null);

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

  useEffect(() => {
    let unsub: any = null;
    if (session) {
      const { user } = session;
      supabase
        .from("positions")
        .select("*")
        .order("created_at", { ascending: false })
        .eq("user_id", user.id)
        .then((res) => {
          setPositions(res.data);
        });
      unsub = supabase
        .channel("custom-all-channel")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "positions",
            filter: `user_id=eq.${user?.id}`,
          },
          (payload: any) => {
            if (payload.eventType === "UPDATE") {
              console.log(payload);
              setPositions((positions) =>
                positions!.map((position) => {
                  if (position.id === payload.new.id) {
                    return payload.new;
                  } else {
                    return position;
                  }
                }),
              );
            } else {
              setPositions((positions) => [payload.new, ...positions!]);
            }
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
    positions,
  };

  return <UserContext.Provider value={res} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};

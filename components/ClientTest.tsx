"use client";
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
import { FC } from "react";

interface ClientTestProps {}

const ClientTest: FC<ClientTestProps> = ({}) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  const user = useSupaUser();

  console.log("session", session);
  console.log("user", user);
  return <div>ClientTest</div>;
};

export default ClientTest;

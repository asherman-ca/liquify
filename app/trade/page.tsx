import { redirect } from "next/navigation";
import getUser from "@/actions/getUser";
import React from "react";

const page = async () => {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return <div>trade</div>;
};

export default page;

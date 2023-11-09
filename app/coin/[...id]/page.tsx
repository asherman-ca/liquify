"use client";
import { FC } from "react";
import Lottie from "lottie-react";
import loaderAnimation from "@/public/loader.json";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8">
      <h1 className="-mb-32 text-2xl font-semibold">Page Under Construction</h1>
      <Lottie animationData={loaderAnimation} className="w-[50%]" />
    </div>
  );
};

export default page;

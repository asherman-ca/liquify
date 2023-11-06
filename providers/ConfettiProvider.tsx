"use client";
import useConfetti from "@/hooks/useConfetti";
import { FC } from "react";
import Confetti from "react-confetti";

interface ConfettiProviderProps {}

const ConfettiProvider: FC<ConfettiProviderProps> = () => {
  const { active } = useConfetti();

  return (
    <>
      {active && (
        <Confetti height={window.innerHeight} width={window.innerWidth} />
      )}
    </>
  );
};

export default ConfettiProvider;

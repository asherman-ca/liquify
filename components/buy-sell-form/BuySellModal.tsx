"use client";
import { FC, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import CoinForm from "./CoinForm";
import Image from "next/image";
import { moneyParse } from "@/libs/numbering";
import { ChevronRight, Landmark } from "lucide-react";
import { cn } from "@/libs/utils";
import styles from "./form.module.css";
const { inputField } = styles;
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";

interface BuySellModalProps {
  coins: Coin[];
  balance: number;
}

type Inputs = {
  coin_name: string;
  coin_id: string;
  value: number;
  leverage: number;
  direction: string;
  coin_symbol: string;
  coin_price: number | string;
};

const BuySellModal: FC<BuySellModalProps> = ({ coins, balance }) => {
  const { supabase, user, balance: curBalance } = useUser();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [open, setOpen] = useState<boolean>(false);
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      coin_name: "Bitcoin",
      coin_id: "bitcoin",
      direction: "long",
      value: 0,
      leverage: 1,
      coin_symbol: "btc",
      coin_price: coins[0].priceUsd,
    },
  });
  const [size, setSize] = useState<string>("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { error: error1 } = await supabase
      .from("positions")
      .insert({ ...data, size: data.value * data.leverage });
    if (!error1) {
      console.log("data", data);
      const { error: error2 } = await supabase
        .from("balances")
        .update({ balance: curBalance! - data.value })
        .eq("user_id", user?.id);
      setSize("");
      setValue("value", 0);
      if (error2) {
        toast.error("Something went wrong");
      } else {
        toast.success("Position created");
      }
    } else {
      toast.error("Something went wrong");
    }
    // router.refresh();
  };

  const handleCoinSelection = (coin: Coin) => {
    const { name, symbol } = coin;
    setValue("coin_name", name);
    setValue("coin_symbol", symbol);
    setValue("coin_price", Number(coin.priceUsd));
    setValue("coin_id", coin.id);
    setOpen(false);
  };

  const handleLeverageSelection = (leverage: number) => {
    if (watch("leverage") === leverage) {
      setValue("leverage", 1);
    } else {
      setValue("leverage", leverage);
    }
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value !== "") {
      const sanitizedValue = value.replace(/[,|$]/g, "");
      setSize("$" + sanitizedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      setValue("value", Number(sanitizedValue));
    } else {
      setSize(value);
      setValue("value", Number(value));
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="h-[40px] rounded-full px-8"
        color="primary"
      >
        Buy & Sell
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
        onClose={() => {
          setOpen(false);
          setSize("");
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {!open ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalHeader className="flex p-0">
                    <button
                      className={`flex-1 border-r-1 border-gray-300 p-4 text-center hover:bg-primary-50 ${
                        watch("direction") === "short" && "border-b-1"
                      }`}
                      onClick={() => setValue("direction", "long")}
                      type="button"
                    >
                      Long
                    </button>
                    <button
                      className={`flex-1 border-gray-300 p-4 text-center hover:bg-primary-50 ${
                        watch("direction") === "long" && "border-b-1"
                      }`}
                      onClick={() => setValue("direction", "short")}
                      type="button"
                    >
                      Short
                    </button>
                  </ModalHeader>
                  <ModalBody className="p-0 pt-4">
                    <div className="my-4 flex items-center justify-center overflow-hidden">
                      <input
                        className={`${inputField} dark:bg-[#18181B]`}
                        type="string"
                        placeholder="$0"
                        value={size}
                        onChange={handleSizeChange}
                      />
                    </div>
                    <div className="flex gap-6 px-4">
                      <Button
                        radius="full"
                        className={cn(
                          "flex flex-1 items-center justify-center",
                          {
                            "bg-primary-300": watch("leverage") === 10,
                          },
                        )}
                        onClick={() => handleLeverageSelection(10)}
                      >
                        x10
                      </Button>
                      <Button
                        radius="full"
                        className={cn(
                          "flex flex-1 items-center justify-center",
                          {
                            "bg-primary-300": watch("leverage") === 25,
                          },
                        )}
                        onClick={() => handleLeverageSelection(25)}
                      >
                        x25
                      </Button>
                      <Button
                        radius="full"
                        className={cn(
                          "flex flex-1 items-center justify-center",
                          {
                            "bg-primary-300": watch("leverage") === 100,
                          },
                        )}
                        onClick={() => handleLeverageSelection(100)}
                      >
                        x100
                      </Button>
                    </div>
                    <div className="my-4 h-[1px] bg-gray-300" />
                    <button
                      onClick={() => setOpen(true)}
                      className="flex justify-between rounded-lg p-4 hover:bg-primary-50 active:bg-primary-100"
                    >
                      <div className="flex items-center gap-4">
                        <Image
                          src={`/icon/${watch(
                            "coin_symbol",
                          ).toLowerCase()}.png`}
                          alt={watch("coin_name")}
                          width={24}
                          height={24}
                          className="h-10 w-10"
                        />
                        <div className="flex flex-col items-start justify-between">
                          <p className="font-semibold capitalize">
                            {watch("direction")}
                          </p>
                          <p className="text-gray-500">{watch("coin_name")}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                          <p>{moneyParse(Number(watch("coin_price")))}</p>
                          <p className="text-gray-500">Price</p>
                        </div>
                        <ChevronRight />
                      </div>
                    </button>
                    <button
                      disabled
                      className="flex justify-between rounded-lg p-4 hover:bg-primary-50"
                    >
                      <div className="flex items-center gap-4">
                        <Landmark className="h-10 w-10" />
                        <div className="flex flex-col items-start justify-between">
                          <p className="font-semibold capitalize">Pay with</p>
                          <p className="text-gray-500">USD Balance</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                          <p>{moneyParse(curBalance || balance)}</p>
                          <p className="text-gray-500">USD</p>
                        </div>
                        <ChevronRight />
                      </div>
                    </button>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      className="flex w-full rounded-full p-6 text-center text-base font-semibold"
                      color="primary"
                      type="submit"
                    >
                      <span className="capitalize">{watch("direction")}</span>{" "}
                      {watch("coin_name")} (x{watch("leverage")})
                    </Button>
                  </ModalFooter>
                </form>
              ) : (
                <CoinForm
                  coins={coins}
                  setOpen={setOpen}
                  handleCoinSelection={handleCoinSelection}
                  coinId={watch("coin_id")}
                />
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default BuySellModal;

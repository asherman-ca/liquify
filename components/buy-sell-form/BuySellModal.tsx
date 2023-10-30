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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [open, setOpen] = useState<boolean>(false);
  const {
    register,
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
      coin_symbol: "BTC",
      coin_price: moneyParse(Number(coins[0].priceUsd)),
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const handleCoinSelection = (coin: Coin) => {
    const { name, symbol } = coin;
    setValue("coin_name", name);
    setValue("coin_symbol", symbol);
    setValue("coin_price", Number(coin.priceUsd));
    setValue("coin_id", coin.id);
    setOpen(false);
  };

  const handleLeverageSelection = (leverage: number) => {
    console.log(watch("leverage"));
    if (watch("leverage") === leverage) {
      setValue("leverage", 1);
    } else {
      setValue("leverage", leverage);
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
        onClose={() => setOpen(false)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {!open ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalHeader className="flex p-0">
                    <button
                      className={`border-r-1 hover:bg-primary-50 flex-1 border-gray-300 p-4 text-center ${
                        watch("direction") === "short" && "border-b-1"
                      }`}
                      onClick={() => setValue("direction", "long")}
                    >
                      Long
                    </button>
                    <button
                      className={`hover:bg-primary-50 flex-1 border-gray-300 p-4 text-center ${
                        watch("direction") === "long" && "border-b-1"
                      }`}
                      onClick={() => setValue("direction", "short")}
                    >
                      Short
                    </button>
                  </ModalHeader>
                  <ModalBody className="p-2">
                    <input
                      type="number"
                      placeholder="0"
                      {...register("value")}
                    />
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
                    <button
                      onClick={() => setOpen(true)}
                      className="hover:bg-primary-50 active:bg-primary-100 flex justify-between rounded-lg p-4"
                    >
                      <div className="flex items-center gap-4">
                        <Image
                          src={`/icon/${watch("coin_symbol")}.png`}
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
                      className="hover:bg-primary-50 flex justify-between rounded-lg p-4"
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
                          <p>{moneyParse(balance!)}</p>
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

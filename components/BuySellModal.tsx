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

interface BuySellModalProps {
  coins: Coin[];
}

type Inputs = {
  coin_name: string;
  coin_id: string;
  value: number;
  leverage: number;
  direction: string;
};

const BuySellModal: FC<BuySellModalProps> = ({ coins }) => {
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
      coin_id: "btc",
      direction: "long",
      value: 0,
      leverage: 1,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const handleCoinSelection = (coinName: string) => {
    setValue("coin_name", coinName);
    setOpen(false);
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
        {!open ? (
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex p-0">
                  <button
                    className={`border-r-1 flex-1 border-gray-300 p-4 text-center ${
                      watch("direction") === "short" && "border-b-1"
                    }`}
                    onClick={() => setValue("direction", "long")}
                  >
                    Long
                  </button>
                  <button
                    className={`flex-1 border-gray-300 p-4 text-center ${
                      watch("direction") === "long" && "border-b-1"
                    }`}
                    onClick={() => setValue("direction", "short")}
                  >
                    Short
                  </button>
                </ModalHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalBody>
                    <input
                      type="number"
                      placeholder="0"
                      {...register("value")}
                    />
                    <input
                      type="number"
                      placeholder="0"
                      {...register("leverage")}
                    />
                    <button onClick={() => setOpen(true)}>choose coin</button>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      className="flex w-full rounded-full text-center font-semibold"
                      color="primary"
                      type="submit"
                    >
                      <span className="capitalize">{watch("direction")}</span>{" "}
                      {watch("coin_name")}
                    </Button>
                  </ModalFooter>
                </form>
              </>
            )}
          </ModalContent>
        ) : (
          <ModalContent>
            {(onClose) => (
              <>
                {coins.map((coin) => (
                  <button
                    key={coin.id}
                    onClick={() => handleCoinSelection(coin.name)}
                  >
                    {coin.name}
                  </button>
                ))}

                <button onClick={() => setOpen(false)}>back</button>
              </>
            )}
          </ModalContent>
        )}
      </Modal>
    </>
  );
};

export default BuySellModal;

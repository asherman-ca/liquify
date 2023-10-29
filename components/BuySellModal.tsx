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
  button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

interface BuySellModalProps {
  coins: Coin[];
}

type Inputs = {
  coin_id: string;
  value: number;
  leverage: number;
  direction: string;
};

const BuySellModal: FC<BuySellModalProps> = ({ coins }) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [open, setOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  // const handleSell = (onClose: () => void) => {
  //   console.log("sell");
  //   onClose();
  //   router.push("/assets");
  // };

  return (
    <>
      <Button
        onPress={onOpen}
        className="h-[40px] rounded-full px-8"
        color="primary"
      >
        Buy & Sell
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
        {!open ? (
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex p-0">
                  <div
                    className="border-r-1 flex-1 border-gray-300 p-4 text-center"
                    onClick={() => setValue("direction", "long")}
                  >
                    Long
                  </div>
                  <div
                    className="border-b-1 flex-1 cursor-pointer border-gray-300 p-4 text-center"
                    onClick={() => setValue("direction", "short")}
                  >
                    Short
                  </div>
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
                      className="flex w-full rounded-full text-center"
                      color="primary"
                      type="submit"
                    >
                      Buy Coin
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
                    onClick={() => setValue("coin_id", coin.name)}
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
